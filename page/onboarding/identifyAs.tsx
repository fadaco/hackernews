import { useState, useEffect } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../../store/actions/onboarding.actions';
import { RadioButton, } from 'react-native-paper';
import TextTypo from '../../components/textTypo';
import {User} from '../../store/type'
import Footer from '../../components/footer';

export default function IdentifyAsScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
   
  useEffect(() => {
    getCategory('identify').then((res) => setCategories(res.data))
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
      <TextTypo fw="bold" size={25} mb={20} title="How do you Identify?" />
      {categories.length ? <RadioButton.Group onValueChange={(value)=> setValue(value)} value={value}>
        {categories.slice(0, 6).map((category: string, index: number) => (
          <View style={styles.selectContainer} key={index}>
            <RadioButton.Item labelStyle={{
              fontFamily: 'Averta'
            }} label={category} value={category} />
          </View>
        ))}
      </RadioButton.Group> : <></>}
         
     
      <Footer title="Next" submitData={() => navigation.navigate('race')}/>
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