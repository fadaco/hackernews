import { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { useSelector } from 'react-redux'
import TextTypo from '../../components/textTypo';
import { Snackbar } from 'react-native-paper';
import {verifyOtp, reSendOtp } from '../../store/actions/onboarding.actions'
import {User} from '../../store/type'
import Footer from '../../components/footer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OTPInputView from '@twotalltotems/react-native-otp-input'


export default function OtpScreen({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    _id: '',
    otp: '',
    email: ''
  })
  const { email, _id } = useSelector((state: any) => state.onboarding);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('')
  
  useEffect(() => {
    setUserParam({
      ...userParam,
      _id: _id,
      email: email,
      })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <TextTypo mb={20} size={25} fw="bold" title="Verify E-mail"/>
      <TextTypo title={`Kindly fill in the 4 Digit code we just sent to ${email}`} />

      <OTPInputView
          style={{width: '100%', height: 120}}
          pinCount={4}
              autoFocusOnLoad
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              codeInputFieldStyle={{width: 65, borderWidth: 1, borderColor: '#5f1489', color: '#000000'}}
        onCodeFilled={(async(code) => {
          const response = await verifyOtp({
            ...userParam,
            otp: code
          })
          console.log(response)
          if (response.status) {
            await AsyncStorage.setItem('token', response.data.token)
            navigation.navigate('otpVerify', {
              page: response.data.redirect_url
            })
          } else {
            setMessage(response.message)
          }

          // setUserParam({
          //   ...userParam,
          //   otp: code
          // })
        })} />
      
      <View style={{flexDirection: 'row'}}>
        <TextTypo title="Didn’t get an email? " />
        <TouchableNativeFeedback onPress={async () => {
          const response = await reSendOtp(userParam)
          setMessage(response.message)
        }}>
          <TextTypo color="#5f1489" title="Send again" />
        </TouchableNativeFeedback> 
      </View>
      <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>

      {/* <Footer title="Next" loading={loading} submitData={async () => {
                    setLoading(true)
                    const response = await verifyOtp(userParam)
                    g(response)
                    if (response.status) {
                      await AsyncStorage.setItem('token', response.data.token)
                      navigation.navigate('otpVerify', {
                        page: response.data.redirect_url
                      })
                    } else {
                      setMessage(response.message)
                    }
                    setLoading(false)
      }} /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      padding: 20,
     textAlign: 'center',
      backgroundColor: '#ffffff'
  },
  borderStyleHighLighted: {
    borderColor: "#5f1489",
    color: '#000000'
  },
  underlineStyleHighLighted: {
    borderColor: "#5f1489",
    color: '#000000'
  },
  snackbar: {
    marginTop: 100
  }
  });