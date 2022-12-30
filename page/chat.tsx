import { useState, useEffect, useCallback, useRef } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Avatar, Modal, Chip} from 'react-native-paper';
import { Actions, ActionsProps, GiftedChat, IMessage } from 'react-native-gifted-chat'
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { openActionSheetModal, openProfileModal } from '../store/actions/user.actions';
import { blockUser, unMatchUser, getConversations } from '../store/actions/match.actions';
import socket from '../shared/socket';
import {Message } from '../store/type';
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import TextTypo from '../components/textTypo';
import uuid from 'react-native-uuid';
import { EMPTY_URL, URL } from '../config';
import CachedImage from '../components/cachedImage';

export default function Chatcreen({ route,itemId, navigation }:any) {
    const { chats } = route.params
    const [messages, setMessages] = useState<IMessage[]>([]);
    const { _id, full_name, images } = useSelector((state: any) => state.onboarding);
    const actionSheetRef = useRef<ActionSheetRef>(null);
    const { user_chat, user_message, actionSheet, user_send_message, profileModal} = useSelector((state: any) => state.match);
    const dispatch: any = useDispatch();
console.log(user_chat)
    useEffect(() => {
        dispatch(getConversations());
        setMessages([]);  
       setMessages((previousMessages: any) => GiftedChat.append(previousMessages, chats))
         if (user_send_message._id) {
             setMessages((previousMessages: any) => GiftedChat.append([user_send_message],previousMessages))
         }
    }, [user_send_message._id]);
    
    useEffect(() => {
        if (actionSheet) {
            actionSheetRef.current?.show()
        } else {
            actionSheetRef.current?.hide()
        }
    }, [actionSheet])

    const onSend = useCallback((messages = []) => {
        const {text, createdAt, user, _id}: any = messages[0];
        setMessages((previousMessages: any) => GiftedChat.append(messages, previousMessages))
        socket.emit('sendMessage', {
            _id,
            senderId: user?._id,
            receiverId: user_chat._id,
            fullname: user_chat.full_name,
            deviceId: user_chat?.deviceId,
            text: text,
            read: false,
            createdAt: createdAt,
            imageurl: user_chat.images.length ? user_chat.images[0].image : '',
            user: user
        })
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
            />)
    }

    return (
        <SafeAreaView style={styles.container}>
            <GiftedChat
                placeholder="Write something..."
                inverted={false}
                showUserAvatar={false}
                renderActions={renderActions}
                showAvatarForEveryMessage={true}
                renderAvatar={() => null}
                messages={messages}
                onSend={(messages: any) => onSend(messages)}
                user={{
                    _id: _id,
                    name: full_name,
                    avatar: images.length ? images[0].image : EMPTY_URL
                }}
                messageIdGenerator={() => String(uuid.v4())}
            />
            
            <Modal visible={profileModal} onDismiss={() => dispatch(openProfileModal(false))} contentContainerStyle={styles.modal}>
                <ScrollView style={{width: '100%'}}>
                    <View style={{width: '100%', height: 400}}>
                        <CachedImage style={{ width: '100%', height: '100%' }} url={URL + user_chat.images[0].image} />
                    </View>
                    <View style={{padding: 20}}>
                        <TextTypo fontFamily="Averta Bold" size={25} title={user_chat.full_name} />
                        <TextTypo mt={15} ml={10} title="Interests" />
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {user_chat.interests?.map((interest:string, index:number) => (
                                <Chip key={index} compact style={{margin: 4}}>
                                <TextTypo title={ interest} />
                                </Chip>
                            ))}
                            
                        </View>
                       
                    </View>
                    <View>
                        
                        {user_chat.images.length > 1 ? user_chat.images.slice(1).map((image: any, index: number) => (
                         <View key={index} style={{width: '100%', height: 400, marginVertical: 5}}>
                                <CachedImage  style={{ width: '100%', height: '100%' }} url={URL + image.image} />
                                </View>
                            )) : <></>}
                        <View style={{ padding: 20 }}>
                        <TextTypo mt={15} ml={10} title="Sports" />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {user_chat.sports?.map((sport:string, index:number) => (
                      <Chip key={index} compact style={{margin: 4}}>
                      <TextTypo title={ sport} />
                      </Chip>
                  ))}
           
                </View>
                       </View>
                    </View>

                  </ScrollView>
                </Modal>
               
             <ActionSheet ref={actionSheetRef} containerStyle={styles.actionsheet} onClose={() =>  dispatch(openActionSheetModal(false))}>
                <TouchableOpacity onPress={async () => {
                    const response = await unMatchUser(user_chat._id)
                    if (response.status) {
                        actionSheetRef.current?.hide();
                        dispatch(getConversations());
                        navigation.goBack()
                    }
                }}>
                    <TextTypo mv={20} size={16} color="#6E6968" fontFamily="Averta Bold" title="Unmatch" /> 
                </TouchableOpacity>
                <TouchableOpacity onPress={async () => {
                    const response = await blockUser(user_chat._id)
                    if (response.status) {
                        actionSheetRef.current?.hide()
                        dispatch(getConversations())
                        navigation.navigate('user')
                    }
                }}>
                    <TextTypo size={16} color="#6E6968" fontFamily="Averta Bold" title="Block User" /> 
                </TouchableOpacity>
        </ActionSheet>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    actionsheet: {
        height: '20%',
        padding: 20
    },
    modal: {
        backgroundColor: '#ffffff',
        marginHorizontal: 20,
        borderRadius: 8,
        overflow: 'hidden'
    }
})