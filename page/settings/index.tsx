import { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import TextTypo from "../../components/textTypo";
import { Avatar, Button, Switch } from "react-native-paper";
import { setUpProfile, goToDashboard } from "../../store/actions/onboarding.actions";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingScreen({ route, navigation }: any) { 
    const { is_block } = useSelector((state: any) => state.onboarding);
    const [isSwitchOn, setIsSwitchOn] = useState<boolean>(is_block);
    const dispatch:any = useDispatch();
    const onToggleSwitch = async() => {
            await setUpProfile({
                type: 'is_block',
                name: !isSwitchOn
            })
           
       setIsSwitchOn(!isSwitchOn);
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 20}}>
                <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('settingsDetail')}>
                        <View>
                            <TextTypo color="#3D3735" title={'Current Location'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                </TouchableOpacity>
                <TextTypo mt={30} mb={10} color="#6E6968" title="Temporarily appear offline and hide your profile from all users. Don’t worry you won’t loose any connections or chats"/>
                <TouchableOpacity style={styles.tabContainer}>
                        <View>
                            <TextTypo color="#3D3735" title={'Incognito'} />
                        </View>
                    <View>
                    <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.tabContainer}>
                        <View>
                            <TextTypo color="#3D3735" title={'Notifications'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.tabContainer}>
                        <View>
                            <TextTypo color="#3D3735" title={'Security & Privacy'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
            </View>
            
            <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Button style={styles.button} labelStyle={styles.buttonText} mode="contained">Delete account</Button>
                <Button style={styles.button} labelStyle={styles.buttonText2} onPress={async () => {
                    try {
                        await AsyncStorage.clear();
                        dispatch(goToDashboard(1))
                        //navigation.navigate('landing')
                    } catch (e) {
                        console.log(e)
                    }
                }}>Logout</Button>
         </View>
            
         </SafeAreaView>
     )

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        flex: 1,
        paddingHorizontal: 20
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F4F4F4',
        borderRadius: 6,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },
    button: {
        borderRadius: 6,
        backgroundColor: '#F4F4F4',
        marginTop: 15
    },
    buttonText: {
        color: '#000000'
    },
    buttonText2: {
        color: '#F52549'
    }
})
