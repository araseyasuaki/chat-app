import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function MessageItem({message, currentUser}) {
  if(currentUser?.userId == message?.userId){

    return (

        <View className='flex-row justify-end mb-3 mr-3'>
          <View style={{width: wp(80)}}>
            <View className="flex self-end p-3 rounded-2xl bg-white">
            <Text style={{fontSize : hp(1.9)}}>
              {message?.text}
            </Text>
            </View>
          </View>
        </View>
      )
    }else{
      return (
        <View style={{width: wp(80)}} className="ml-3 mb-3">
          <View classname="flex self-star p-3 px-4 roudned-2xl bg-indigo-100 border">
            <Text style={{fontSize: hp(1.9)}}>
              {message?.text}
              </Text>
          </View>
        </View>
    )
    }
}

//https://www.youtube.com/watch?v=OgNiNiaedVs&list=PLKWMD009Q4qRvrfjGotVfUbqGoLdvRDN4&index=8