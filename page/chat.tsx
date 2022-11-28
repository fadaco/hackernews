import { useState, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Avatar} from 'react-native-paper';
import { Actions, ActionsProps, GiftedChat, IMessage } from 'react-native-gifted-chat'
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import socket from '../shared/socket';
import {Message } from '../store/type';

export default function Chatcreen({ route }:any) {
    const { chats } = route.params
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { socket_id, _id } = useSelector((state: any) => state.onboarding);
    const { user_chat, user_message } = useSelector((state: any) => state.match);
    let tmpChat:any = []
     useEffect(() => {
         chats.forEach((dt:any) => {
             tmpChat.push({
                 _id: Math.floor(Math.random() * 10000),
                 text: dt.content,
                 createdAt: new Date(),
                 user: {
                     _id: dt.sender
                 }
             })
         })
         setMessages((previousMessages:any) => GiftedChat.append(previousMessages, tmpChat.reverse()))

        // console.log(user_chat._id)
    setMessages((previousMessages:any) => GiftedChat.append(previousMessages, user_message.filter((dt:any) => user_chat._id === dt.user._id)))
       }, [user_message.length])

    const onSend = useCallback((messages = []) => {
        const {  createdAt, text, user,} = messages[0]

        socket.emit('sendMessage', {
            senderId: _id,
            receiverId: user_chat._id,
            fullname: user_chat.full_name,
            deviceId: 3,
            text: text,
            imageurl: user_chat.images.length ? user_chat.images[0].image : ''
        })
        console.log(messages)
        
        setMessages((previousMessages:any) => GiftedChat.append(previousMessages, messages))
    }, [])


    const handlePickImage = async () => {
        try {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
            let result: any = await ImagePicker.launchImageLibraryAsync();
          if (!result.cancelled) {
           return result.uri
          }
        } catch (error) {
         // console.log(error)
        }
       
      };
    
    const renderActions = (props: Readonly<ActionsProps>) => {
        return (
            <Actions
            {...props}
            options={{
                ['Send Image']: handlePickImage,
              }}
            icon={() => (
                <Avatar.Icon size={24} icon="attachment" />
                )}
                onSend={messages => onSend(messages)}
            />
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <GiftedChat
                infiniteScroll
                placeholder="Write something..."
                alignTop
                inverted
                renderActions={renderActions}
                renderAvatar={() => null}
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: _id,
                }}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 20
    }
})