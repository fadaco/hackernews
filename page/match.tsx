import { useCallback } from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import CachedImage from '../components/cachedImage';
import { useFocusEffect } from '@react-navigation/native';
import {  getConversations, getLikes, getUserMatches, clearChatField } from '../store/actions/match.actions';
import TextTypo from '../components/textTypo';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchUserDetailToChat } from '../store/actions/match.actions';
import { EMPTY_URL, URL, PLACEHOLDER_IMAGE } from '../config';



export default function MatchScreen({ navigation }: any) {
    const { _id } = useSelector((state: any) => state.onboarding);
    const { user_matches, conversation_list, user_message } = useSelector((state: any) => state.match);

    const dispatch: any = useDispatch();

      useFocusEffect(
        useCallback(() => {
            dispatch(getConversations())
            dispatch(getLikes())
            dispatch(getUserMatches())
            dispatch(clearChatField())
        }, [])
      );
    
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, backgroundColor: '#ffffff', flex: 1, paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
            {user_matches.length ? <TextTypo size={18} color="#251E1C" mt={20} title="New Matches" /> : <></>}
            <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, index) => index.toString()}  
                data={user_matches}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => {
                        dispatch(dispatchUserDetailToChat(item))
                        navigation.navigate('chat', {
                            chats: [],
                            data: item
                        })
                    }} key={index} style={styles.imageContainer}>
                        <CachedImage style={styles.image} url={URL + '' + item.images[0].image} />
                     </TouchableOpacity>
                )}
                />
                </View>
            <TextTypo size={18} color="#251E1C" mt={20} title="Chats" />
                        
            <FlatList
                keyExtractor={(item, index) => index.toString()}  
                data={conversation_list}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.chat} onPress={() => {
                        dispatch(dispatchUserDetailToChat(item))
                        navigation.navigate('chat', {
                            chats: item.user_chats[_id],
                            data: item
                        })
                    }}>
                            <View style={{flexDirection: 'row'}}>
                                <View key={index} style={styles.imageContainerChat}>
                                <CachedImage style={styles.imageChat} url={URL + '' + item.images[0].image} />
                                </View>
                                <View>
                                    <TextTypo fw="bold" mb={15} title={item.full_name} />
                                    <TextTypo title={item.user_chats[_id][item.user_chats[_id].length - 1].text} />
                                </View>
                            </View>
                        <View style={{flexDirection: 'row'}}>
                            {/* <View style={{height: 20, width: 20, backgroundColor: 'tomato', borderRadius: 50}}>
                            <TextTypo color="#ffffff" title={JSON.stringify(user_message.filter((td: any) => (td.user._id === item._id) && (td.read))).length} />
                            </View> */}
                                <Image source={require('../assets/icons/read.png')} />
                            </View>
                    </TouchableOpacity>
                )}
                />
                 {/* </View> */}
         </SafeAreaView>
        )
}


const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#E9E8E8',
        paddingVertical: 14,
      //  alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
        marginVertical: 20,
        borderWidth: 4,
        borderColor: '#5f1489'
    },
    image: {
        width: '100%',
        borderRadius: 50,
        height: '100%' 
    },
    imageContainerChat: {
        width: 60,
        height: 60,
       marginRight: 15
    },
    imageChat: {
        width: '100%',
        borderRadius: 50,
        height: '100%'
    }
})