import { useState, useEffect } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../../store/actions/onboarding.actions';
import { RadioButton, Button, Snackbar } from 'react-native-paper';
import {User} from '../../store/type'
import bcrypt from 'react-native-bcrypt'
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';

export default function RaceScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState<string>('')

  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })

  useEffect(() => {
    getCategory('description').then((res) => setCategories(res.data))
  }, [])


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
      <TextTypo mb={8} size={20} fw="bold" title="How would you describe yourself?" />
      <TextTypo mb={15} size={15} title="Krossbirds is for everyone" />
      
      {categories.length ? <RadioButton.Group onValueChange={(value)=> setValue(value)} value={value}>
      {categories.slice(0, 6).map((category: string, index: number) => (
          <View style={styles.selectContainer} key={index}>
            <RadioButton.Item label={category} labelStyle={{
              fontFamily: 'Averta'
            }}  value={category} />
          </View>
        ))}
      </RadioButton.Group> : <></>}
         
      
      <Footer title="Next" submitData={() => navigation.navigate('intention')}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
      padding: 20,
      alignItem: 'center',
     justifyContent: 'center',
      textAlign: 'center'
  },
  selectContainer: {
    backgroundColor: '#F4F3F3',
    borderRadius: 8,
    marginVertical: 5,
    height: 70,
    justifyContent: 'center'
  }
  });