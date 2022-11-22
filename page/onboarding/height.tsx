import { useState, useEffect, useRef } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getCategory } from '../../store/actions/onboarding.actions';
import { Button } from 'react-native-paper';
import { goToDashboard } from '../../store/actions/onboarding.actions';
import {User} from '../../store/type'
import Footer from '../../components/footer';
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import { Picker } from '@react-native-picker/picker';
import TextTypo from '../../components/textTypo';


export default function HeightScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState();
    const actionSheetRef = useRef<ActionSheetRef>(null);
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  const dispatch: any = useDispatch();


   const [message, setMessage] = useState<string>('')

   useEffect(() => {
    getCategory('heights').then((res) => setCategories(res.data))
  }, [])

  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }

  return (
    <SafeAreaView style={styles.container}>
          <TextTypo fw="bold" size={25} mb={7} title="What’s your height?" />
          <TextTypo title="Information like this helps beef up your profile"/>
          <TouchableOpacity style={styles.showHeight} onPress={() => actionSheetRef.current?.show()}>
              <TextTypo color="#251E1C" title={selectedLanguage || 'Choose your height'}/>
          </TouchableOpacity>
      
          <ActionSheet ref={actionSheetRef}>
              <View style={styles.actionsheet}>
          <TextTypo fw="bold" size={25} mb={7} title="Your height" />

          <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
            {categories.length && categories.map((category: string, index: number) => (
              <Picker.Item key={index} label={category} style={{
                fontFamily: 'Averta'
              }} value={category} />
            ))}
          </Picker>
          <Button labelStyle={{ fontFamily: 'Averta'}} onPress={() => actionSheetRef.current?.hide()}  mode="contained" style={{ borderRadius: 8, paddingVertical: 6 }}>Choose height</Button>
          <Button labelStyle={{ fontFamily: 'Averta'}}  onPress={() => actionSheetRef.current?.hide()}  style={{marginTop: 6}}>Cancel</Button>

            </View>   
        </ActionSheet>
  
      <Footer title="Next" submitData={() => {
          dispatch(goToDashboard(true))
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
   actionsheet: {
      height: '50%',
      padding: 20
  },
  showHeight: {
    backgroundColor: '#F4F3F3',
    height: 70,
    borderRadius: 8,
    marginTop: 25,
    justifyContent: 'center',
    paddingLeft: 20
  }
  });