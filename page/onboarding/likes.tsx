import sportScreen from '../../components/sport';
import { StyleSheet, View } from 'react-native';
import InterestFieldScreen from '../../components/interestField';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
const TopTab = createMaterialTopTabNavigator();


export default function LikeScreen({ navigation }: any) {

    return (
        <View style={styles.container}>
            <TopTab.Navigator>
        <TopTab.Screen name="interest" component={InterestFieldScreen} />
        <TopTab.Screen name="sports" component={sportScreen} />
            </TopTab.Navigator>
            <Button style={{borderRadius: 8, paddingVertical: 6, backgroundColor: '#5f1489'}}  mode="contained" onPress={() => navigation.navigate('height')}>Continue</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 20,
       textAlign: 'center',
        backgroundColor: '#ffffff'
    },
    });