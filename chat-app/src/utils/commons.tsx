export const getRoomId = (userId1: string): string => {
    const sortedIds = ["Group", userId1].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}