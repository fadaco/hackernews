import { FlatList, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import TextTypo from '../components/textTypo';

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

export default function MatchScreen({navigation}: any) {
    return (
        <SafeAreaView style={{ paddingHorizontal: 20, backgroundColor: '#ffffff' }}>
          <TextTypo size={18} color="#251E1C" mt={20} title="New Matches"/>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={(item, index) => index.toString()}  
                data={data}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.imageContainer}>
                        <Image style={styles.image} source={item.icon} />
                     </View>
                )}

            />
            <TextTypo size={18} color="#251E1C" mt={20} title="Chats" />
            
            <FlatList
                keyExtractor={(item, index) => index.toString()}  
                data={data}
                renderItem={({ item, index }) => (
                    <TouchableOpacity style={styles.chat} onPress={() => navigation.navigate('chat')}>
                            <View style={{flexDirection: 'row'}}>
                                <View key={index} style={styles.imageContainerChat}>
                                    <Image style={styles.imageChat} source={item.icon} />
                                </View>
                                <View>
                                    <TextTypo fw="bold" mb={15} title={item.name} />
                                    <TextTypo title={item.chat} />
                                </View>
                            </View>
                            <View>
                                <Image source={require('../assets/icons/read.png')} />
                            </View>
                    </TouchableOpacity>
                )}

            />
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
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginHorizontal: 10,
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