import { View, StyleSheet, FlatList, Image, Platform, StatusBar } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from "react-redux";
import TextTypo from "../components/textTypo";
import { EMPTY_URL, PLACEHOLDER_IMAGE, URL } from "../config";

export default function UserLikeScreen() { 
    const { user_likes } = useSelector((state: any) => state.match);
    const { subscription } = useSelector((state: any) => state.onboarding);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TextTypo size={20} color="#ffffff" ta="center" title={'Likes'}/>
            </View>
            <View style={{padding: 20, backgroundColor: '#ffffff', flex: 1}}>
            <FlatList
              keyExtractor={(item, index) => index.toString()}      
              numColumns={2} data={user_likes}
                renderItem={({item }) => (
                    <View style={styles.imageContainer}>
                        <Image blurRadius={subscription === 'FREE' ? 90 : 1} defaultSource={{uri: PLACEHOLDER_IMAGE}} resizeMode='cover' style={styles.image} source={{
                            uri: item.images.length ? (URL + '' + item.images[0].image) : EMPTY_URL
                        }}
                        />
                  </View>
              )}
                />
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(95, 20, 137, 0.9)',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    header: {
        marginBottom: 50,
        height: 80
    },
    imageContainer: {
        height: 250,
        width: 150,
        borderRadius: 6
    },
    image: {
        height: '100%',
        width: '100%',
        borderRadius: 6
    }
})