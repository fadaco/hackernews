import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import TextTypo from './textTypo';

export default function SettingList({ text, icon, onPress }: any) {

    return (
        <View style={styles.main}>
         <TouchableOpacity onPress={() => onPress()} style={styles.container}>
            <Image source={icon} />
        </TouchableOpacity>
         <TextTypo title={ text }/>
        </View>
       
    )
}


const styles = StyleSheet.create({
    main: {

    },
    container: {
        backgroundColor: '#E9E6E7',
        width: 48,
        height: 48,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 15
        //flexDirection: 'row'
    }
})