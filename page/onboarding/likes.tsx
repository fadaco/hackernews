import { useState } from 'react';
import sportScreen from '../../components/sport';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux'
import { Snackbar } from 'react-native-paper';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import InterestFieldScreen from '../../components/interestField';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Button } from 'react-native-paper';
const TopTab = createMaterialTopTabNavigator();


export default function LikeScreen({ navigation }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');

    const { interests, sports } = useSelector((state: any) => state.onboarding);

    return (
        <View style={styles.container}>
            <TopTab.Navigator>
        <TopTab.Screen name="interest" component={InterestFieldScreen} />
        <TopTab.Screen name="sports" component={sportScreen} />
            </TopTab.Navigator>
            <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>

            <Button loading={loading}
                style={{ borderRadius: 8, paddingVertical: 6, backgroundColor: '#5f1489' }}
                mode="contained"
                onPress={async () => {
                    let res1;
                    let res2;
                    setLoading(true)
                    if (interests.length) {
                       res1 = await setUpProfile({
                            type: 'interests',
                            name: interests
                        })
                    }

                    if (sports.length) {
                        res2 = await setUpProfile({
                            type: 'sports',
                            name: sports
                        })
                    }

                    if (!sports.length || !interests.length) {
                        setMessage('select at least one sports and interest to continue')
                    } else {
                        if (res1.status && res2.status) {
                            navigation.navigate('height', {
                                profile: false
                            })
                        }
                    }
                    setLoading(false)
                }}>Continue</Button>
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
    snackbar: {
        marginTop: 100
      }
    });