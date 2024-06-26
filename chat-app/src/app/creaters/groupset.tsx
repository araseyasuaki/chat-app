
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, Touchable, KeyboardAvoidingView} from 'react-native'
import CircleButton from '../../components/CircleButton'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useContext, useState, useEffect } from 'react'
import LogOutButton from '@/src/components/LogOutButton'
import { Feather } from '@expo/vector-icons'
//import firestore from '@react-native-firebase/firestore'
import { auth, db, storage } from '../../config'
import ContinueBtn from '../../components/ContinueBtn'

import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { onSnapshot, doc , collection, addDoc, setDoc, getDoc } from 'firebase/firestore'
import { FontAwesome5 } from '@expo/vector-icons'
import { updateProfile } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";


const handlePress = async (fullName: string, bodyText: string): Promise<void> => {
    if(auth.currentUser === null) {
        console.error('user is not authenticated.')
        return
    }    
    const ref = doc(db, `groups/${auth.currentUser.uid}`)
    setDoc(
        ref, 
        {
            fullName, 
            about : bodyText,
        },
        {merge:true}
    )
        .then((docRef) => {
            console.log('success', docRef)
            router.push('/chat/groupchat')
        }).catch((error)=> {
            console.log(error)
        })
}


const Profileset = (): JSX.Element => {

    // Common Header
    const navigation = useNavigation()
    useEffect(() => { 
        navigation.setOptions({
            headerRight: () => { return <LogOutButton /> }
        })
    },[])


    const [image, setImage] = useState<string | null>(null);
    const [name, setName] = useState('')
    const [bodyText, setBodyText] = useState('')

    useEffect(() => {
        // Function to fetch existing profile image and set it in state on component mount
        const fetchProfileData = async () => {
            try {
                if (!auth.currentUser) {
                    console.error('User is not authenticated.');
                    return;
                }
                const userDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                const docSnap = await getDoc(userDocRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                
                    if (userData) {
                        if (userData.profileImage) {
                            setImage(userData.profileImage);
                        }
                        if (userData.fullName) {
                            setName(userData.fullName);
                        }
                        if (userData.about) {
                            setBodyText(userData.about);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching profile image:', error);
            }
        };

        fetchProfileData(); // Call the function on component mount

    }, []);


    //async function pickImage() {
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        })
        if(!result.canceled){
            //setImage(result.assets[0].uri) // only one image
            await uploadImage(result.assets[0].uri)
        }
    }

    async function uploadImage (uri: string){
        const response = await fetch(uri)
        const blob = await response.blob();

        if(auth.currentUser === null) {console.error('user is not authenticated.')
            return}
        const storageRef = ref(storage, `groups/${auth.currentUser.uid}/groupImage.jpg`);
        const uploadTask = uploadBytesResumable(storageRef, blob)

        // Listen for events
        uploadTask.on("state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
                console.log("Progress is "  + progress.toFixed(2) + "% done")
            },
            (error) => {
                console.log("Error is happend ", error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    console.log("File available at", downloadURL)
                    if(auth.currentUser){
                        const groupDocRef = doc(db, `groups/${auth.currentUser.uid}`);
                    await setDoc(groupDocRef, { profileImage: downloadURL }, { merge: true });
                    }

                    // Update the image state with the new image URI
                    setImage(downloadURL);
                }).catch((error)=> {
                    console.error("Error getting download URL:", error)
                })
            }
        )
    }


    return (
        <KeyboardAvoidingView behavior='height' style={styles.container}>
            <View>
                <Text style={styles.title}>グループ設定</Text>
            </View>
            <View style={styles.profileContainer}>
                <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
                    {!image && <FontAwesome5 name="camera" color="#ccc" size={24} />}
                    {!!image && <Image source={{ uri: image }} style={styles.image} />}
                </TouchableOpacity>
                <View style={styles.nameContainer}>
                    <TextInput
                        multiline
                        style={styles.nameInput}
                        value={name}
                        placeholder='グループ名前'
                        placeholderTextColor="#000000"
                        onChangeText={(text) => {setName(text)}}
                    />
                </View>
            </View>
            <View style={styles.aboutTitle}>
                <Text>
                    ユーザー内容
                </Text>
            </View>
            <View style={styles.aboutTitle}>
                <Text>
                    グループについて
                </Text>
            </View>
            <View>
                <TextInput 
                multiline
                style={styles.aboutInput}
                value={bodyText}
                onChangeText={(text) => {setBodyText(text)}}
                />
            </View>
            <CircleButton onPress={() => {handlePress(name, bodyText)}}>
                <Feather name = 'arrow-right' size={30} color='#ffffff'/>
            </CircleButton>
        </KeyboardAvoidingView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    title:{
        fontSize: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 20,
        fontWeight: '500',
        marginBottom: 30
    },
    profileContainer:{
        flexDirection: 'row', // To make photo and name in the same row
        justifyContent: 'space-between',
        alignItems : 'center',
        marginLeft: 15,
        marginRight: 15
    },
    photoContainer:{
        //width: 100,
        //height: 100,
        //borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
        //margin : 8
    },
    image: {
        width: 60,
        height: 60,
        //margin: 8,
        borderRadius: 30 // half of width and height
    },
    nameContainer:{
        flex:1,
        //marginLeft: 16,
        //justifyContent: 'center'
    },
    nameInput: {
        width: 260,
        height: 64,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 16,
        fontSize: 16,
        //marginBottom: 16, // Space between the input and the button
        backgroundColor: '#d9d9d9',
    },
    aboutTitle: {
        marginTop: 30,
        marginLeft: 30,
        marginBottom: 10
    },
    aboutInput: {
        alignSelf: 'center',
        borderWidth: 0,
        width: 322,
        height: 134,
        borderColor: '#cccccc',
        borderRadius: 20,
        padding: 16,
        fontSize: 16,
        marginBottom: 16, // Space between the input and the button
        backgroundColor: '#d9d9d9',
    }
})

export default Profileset
function getExtention(imageUri: string) {
    throw new Error('Function not implemented.')
}

