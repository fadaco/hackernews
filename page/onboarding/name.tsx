import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { TextInput } from 'react-native-paper';
import {User} from '../../store/type'
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';

export default function NameScreen({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  
  const [message, setMessage] = useState<string>('')

  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextTypo mt={50} size={25} mb={20} fw="bold" title="What do we call you?"/>
      <TextInput
        mode='outlined'
        label='Enter your name' style={{ marginVertical: 20 }} />
      <TextTypo title="This is how it will appear on krossbirds"/>
         
      <Footer title="Next" submitData={() => navigation.navigate('dob')}/>
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
  }
  });