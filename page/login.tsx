import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import TextTypo from '../components/textTypo';
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useDispatch } from 'react-redux'
import { loggedInWithEmailAndPhoneNumber, dispatchUserDetailToStore } from '../store/actions/onboarding.actions';
import { TextInput, Snackbar } from 'react-native-paper';
import { User } from '../store/type'
import Footer from '../components/footer';
import PhoneInput from "react-native-phone-number-input";

export default function Login({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    email: '',
    phone_number: ''
  });
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: any = useDispatch();

  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  };
 
  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
      <TextTypo fw="bold" size={25} mb={20} title="Kindly provide the following"/>
      <View>
        <TextInput
          label="Email"
          mode='outlined'
          value={userParam.email?.toLowerCase()}
          onChangeText={text => handleUserInput(text, 'email')} />
        <PhoneInput
          defaultCode="NG"
          textContainerStyle={{ backgroundColor: '#ffffff' }}
          layout="first"
          onChangeFormattedText={(text) => handleUserInput(text, 'phone_number')}
          containerStyle={styles.phone} />
      </View>
      <View>
        
      </View>
      <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
      <Footer  title="Next" loading={loading} submitData={async () => {
        setLoading(true)
        const response = await loggedInWithEmailAndPhoneNumber(userParam);
        if (response.status) {
          dispatch(dispatchUserDetailToStore(response.data))
          navigation.navigate('otp')
        } else {
          setMessage(response.message);
        }
        setLoading(false)
          }} />
          </>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  phone: {
    borderWidth: 1,
    borderColor: '#7b7979',
    marginTop: 20,
    width: '100%',
    borderRadius: 3,
    backgroundColor: '#ffffff'
  },
  snackbar: {
     marginBottom: 70,
     justifyContent: 'center',
     alignItems: 'center',
  }
  });