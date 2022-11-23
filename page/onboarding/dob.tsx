import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet } from 'react-native';
import TextTypo from '../../components/textTypo';
import {User} from '../../store/type'
import Footer from '../../components/footer';
import DatePicker from '@dietime/react-native-date-picker';

export default function DobScreen({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  

   const [message, setMessage] = useState<string>('')
   const [date, setDate] = useState<any>(new Date('16-10-2020'))

  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }

  return (
    <SafeAreaView style={styles.container}>
          <TextTypo fw="bold" size={25} mb={7} title="Hi, Jasmine!" />
          <TextTypo fw="bold" size={25} mb={7} title="When is your birthday?"/>
      <DatePicker value={date} onChange={() => { }}
        startYear={1950} endYear={2005} 
      />
  
      <Footer title="Next" submitData={() => navigation.navigate('identifyAs')}/>
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