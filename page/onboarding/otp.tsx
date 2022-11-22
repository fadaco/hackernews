import { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import TextTypo from '../../components/textTypo';
import { TextInput, Snackbar } from 'react-native-paper';
import {verifyOtp, clearUserObject} from '../../store/actions/onboarding.actions'
import {User} from '../../store/type'
import Footer from '../../components/footer';
import OTPInputView from '@twotalltotems/react-native-otp-input'


export default function OtpScreen({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    _id: '',
    otp: '',
  })
  const dispatch: any = useDispatch();
  const { user, message, status } = useSelector((state: any) => state.onboarding);
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>('')
  
  // useEffect(() => {
  //   setUserParam({
  //     ...userParam,
  //     _id: user._id,
  //     email: user.email,
  //     })
  // }, [])

  useEffect(() => {
    if (status) {
        navigation.navigate('name')
      } else if (!status && message !== '') {
      setResponseMessage(message)
    }
  }, [status])


  const handleUserInput = (text: string, type: string) => {
    setResponseMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }

  
  return (
    <SafeAreaView style={styles.container}>
      <TextTypo mb={20} size={25} fw="bold" title="Verify E-mail"/>
      <TextTypo title="Kindly fill in the 4 Digit code we just sent to your email" />

<OTPInputView
    style={{width: '100%', height: 120}}
    pinCount={4}
        autoFocusOnLoad
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        codeInputFieldStyle={{width: 65, borderWidth: 1, borderColor: '#5f1489', color: '#000000'}}
    onCodeFilled = {(code => {
        console.log(`Code is ${code}, you are good to go!`)
    })}
/>
      
      <View style={{flexDirection: 'row'}}>
        <TextTypo title="Didn’t get an email? " />
        <TextTypo color="#5f1489" title="Send again"/>
      </View>

     
        <Footer title="Next" loading={loading} submitData={() => {
                navigation.navigate('otpVerify')
          // clearUserObject()
          // console.log(userParam)
          // setResponseMessage("");
          // setLoading(true);
          // dispatch(verifyOtp(userParam));
          // setLoading(false);
      }
      } />
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
  });