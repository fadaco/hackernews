import { useState, useEffect } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../../store/actions/onboarding.actions';
import { RadioButton } from 'react-native-paper';
import {User} from '../../store/type'
import TextTypo from '../../components/textTypo';
import Footer from '../../components/footer';

export default function IntentionScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState<string>('')
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  
  useEffect(() => {
    getCategory('intentions').then((res) => setCategories(res.data))
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
      <TextTypo fw="bold" size={25} mb={5} title="Which of this best fit your intentions" />
      <TextTypo mb={15} title="You can always change your selection" />

      {categories.length ? <RadioButton.Group onValueChange={(value)=> setValue(value)} value={value}>
      {categories.slice(0, 6).map((category: string, index: number) => (
          <View style={styles.selectContainer} key={index}>
            <RadioButton.Item label={category} labelStyle={{
              fontFamily: 'Averta'
            }} value={category} />
          </View>
        ))}
             </RadioButton.Group> : <></>}
      <Footer title="Next" submitData={() => navigation.navigate('interestedIn')}/>
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