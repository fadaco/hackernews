import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux'
import { TextInput, Snackbar } from 'react-native-paper';
import { setUpProfile, dispatchUserDetailToStore } from '../../store/actions/onboarding.actions';
import {SetUpUserProfile} from '../../store/type'
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';


export default function NameScreen({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [payload, setPayload] = useState<SetUpUserProfile>({
    name: '',
    type: ''
  })
  const dispatch: any = useDispatch();

  const [message, setMessage] = useState<string>('')

  const handleUserInput = (name: string, type: string) => {
    setMessage('');
    setPayload({
      ...payload,
      name,
      type
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextTypo mt={50} size={25} mb={20} fw="bold" title="What do we call you?"/>
      <TextInput
        mode='outlined'
        onChangeText={(text) => handleUserInput(text, 'full_name')}
        label='Enter your name' style={{ marginVertical: 20 }} />
      <TextTypo title="This is how it will appear on krossbirds" />
      <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
      <Footer loading={loading} title="Next" submitData={async () => {
        setLoading(true)
        const response = await setUpProfile(payload)
        if (response.status) {
          dispatch(dispatchUserDetailToStore({
              [payload.type]: payload.name
          }))
          navigation.navigate('dob')
        } else {
          setMessage(response.message)
          }
          setLoading(false)
      }}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      padding: 20,
      alignItem: 'center',
     justifyContent: 'center',
     textAlign: 'center',
      backgroundColor: '#ffffff'
  },
  snackbar: {
    marginTop: 100
  }
  });