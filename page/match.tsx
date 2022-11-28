import { useCallback } from 'react';
import { FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useFocusEffect } from '@react-navigation/native';
import {  getConversations } from '../store/actions/match.actions';
import TextTypo from '../components/textTypo';
import { useSelector, useDispatch } from 'react-redux';
import { dispatchUserDetailToChat } from '../store/actions/match.actions';
import { EMPTY_URL, URL } from '../config';

const data = [
    {
        name: 'Alyssa',
        icon: require('../assets/icons/testImage.png'),
        chat: 'Hello'
    },
    {
        name: 'Johan',
        icon: require('../assets/icons/profile.png'),
        chat: 'injury '
    },
    {
        name: 'Messi',
        icon: require('../assets/icons/testImage.png'),
        chat: 'overall '
    },
    {
        name: 'Rooney',
        icon: require('../assets/icons/profile.png'),
        chat: 'striker '
    },
    {
        name: 'Ronaldo',
        icon: require('../assets/icons/testImage.png'),
        chat: 'goat '
    },
    {
        name: 'Maradona',
        icon: require('../assets/icons/profile.png'),
        chat: 'world cup '
    }
]

export default function MatchScreen({ navigation }: any) {
    const { _id } = useSelector((state: any) => state.onboarding);
    const { user_matches, conversation_list } = useSelector((state: any) => state.match);
    const dispatch: any = useDispatch();

      useFocusEffect(
        useCallback(() => {
            dispatch(getConversations())
        }, [])
    );

    return (
        <SafeAreaView style={{ paddingHorizontal: 20, backgroundColor: '#ffffff', flex: 1}}>
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
                            chats: []
                        })
                    }} key={index} style={styles.imageContainer}>
                        <Image style={styles.image} source={{
                            uri: item.images.length ? URL + '' + item.images[0].image : EMPTY_URL
                        }} />
                     </TouchableOpacity>
                )}
                />
                </View>
            <TextTypo size={18} color="#251E1C" mt={20} title="Chats" />
            
            {/* <View style={{flex: 1}}> */}
            <FlatList
                keyExtractor={(item, index) => index.toString()}  
                data={conversation_list}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.chat} onPress={() => {
                        dispatch(dispatchUserDetailToChat(item))
                        navigation.navigate('chat', {
                            chats: item.user_chats[_id]
                        })
                    }}>
                            <View style={{flexDirection: 'row'}}>
                                <View key={index} style={styles.imageContainerChat}>
                                <Image style={styles.imageChat} source={{
                                        uri: item.images.length ? URL + '' + item.images[0].image : EMPTY_URL
                                    }} />
                                </View>
                                <View>
                                    <TextTypo fw="bold" mb={15} title={item.full_name} />
                                    <TextTypo title={item.user_chats[_id][item.user_chats[_id].length - 1].content} />
                                </View>
                            </View>
                            <View>
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