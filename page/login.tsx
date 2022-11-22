import { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import TextTypo from '../components/textTypo';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { loggedInWithEmailAndPhoneNumber, clearUserObject } from '../store/actions/onboarding.actions';
import { TextInput, Snackbar } from 'react-native-paper';
import { User } from '../store/type'
import bcrypt from 'react-native-bcrypt'
import Logo from '../components/logo';
import Footer from '../components/footer';
import PhoneInput from "react-native-phone-number-input";

export default function Login({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    email: '',
    phone_number: ''
   })
  const { user, message, status } = useSelector((state: any) => state.onboarding);
  const [responseMessage, setResponseMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (status) {
        navigation.navigate('otp')
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
      <TextTypo fw="bold" size={25} mb={20} title="Kindly provide the following"/>
      <View>
        <TextInput
          label="Email"
          mode='outlined'
          onChangeText={text => handleUserInput(text, 'email')} />
        
        <PhoneInput
          defaultCode="NG"
          layout="first"
       //  onChangeText={(text) => console.log(text)}
          onChangeFormattedText={(text) => handleUserInput(text, 'phone_number')}
          autoFocus
          containerStyle={styles.phone}
        />
      </View>
      <Snackbar visible={responseMessage !== ''} onDismiss={() => setResponseMessage('')}>{ responseMessage}</Snackbar>
      <Footer  title="Next" loading={loading} submitData={() => {
        navigation.navigate('otp')
        //disabled={userParam.email == '' || userParam.phone_number}
        //   dispatch(clearUserObject())
        //   setResponseMessage("");
        //   setLoading(true);
        //   dispatch(loggedInWithEmailAndPhoneNumber(userParam));
        //  setLoading(false);
        // dispatch(clearUserObject())

      }
      } />
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff'
  },
  phone: {
    borderWidth: 1,
    borderColor: '#7b7979',
    marginTop: 20,
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#ffffff'
  },
  });