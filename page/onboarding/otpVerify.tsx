import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native-paper';
import { getPageName } from '../../shared/methods';
import { goToDashboard } from '../../store/actions/onboarding.actions';
import TextTypo from '../../components/textTypo';

export default function OtpVerifyScreen({ route, navigation }: any) {
    const { page } = route.params;
    const dispatch: any = useDispatch();
    useEffect(() => {
        setTimeout(() => {
            if (page === 'dashboard') {
                 AsyncStorage.setItem(
                    'isComplete',
                    'true'
                  );
                dispatch(goToDashboard(true))
                navigation.navigate('dashboard')
            }
            if (page === 'set_up_image') {
                navigation.navigate('photo', {
                    profile: false
                })
            } else {
                navigation.navigate(getPageName(page), {
                    profile: false
                })
            }
        }, 1000)
    }, [])
  
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
            <Image source={require('../../assets/icons/success.png')} />
            </View>
            <TextTypo size={25} mb={20} ta="center" title="Successful" />
            <TextTypo mv={20} ta="center" title="Your  e-mail was successfully verified"/>
            <TextTypo ta="center" title="We’ll automatically redirect you to the next screen"/>
            <ActivityIndicator animating={true} style={{marginTop: 15}} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 40,
        paddingTop: 100,
         textAlign: 'center',
          backgroundColor: '#ffffff'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20
    },
    });