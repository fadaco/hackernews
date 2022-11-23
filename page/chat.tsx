import { useState, useCallback } from 'react'
import { StyleSheet } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { Avatar} from 'react-native-paper';
import { Actions, ActionsProps, GiftedChat } from 'react-native-gifted-chat'
import * as ImagePicker from 'expo-image-picker';


export default function Chatcreen() {
    const [messages, setMessages] = useState([]);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    const handlePickImage = async () => {
        try {
          const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
    
            let result: any = await ImagePicker.launchImageLibraryAsync();
            console.log(result.assets);
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
                renderActions={renderActions}
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
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