import { useState, useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, FlatList } from 'react-native';
import { getCategory } from '../store/actions/onboarding.actions';
import { useSelector, useDispatch } from 'react-redux'
import { RadioButton, Checkbox,Button, Snackbar } from 'react-native-paper';
import {User} from '../store/type'
import TextTypo from './textTypo';

export default function InterestFieldScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [value, setValue] = useState<string>('')
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  
  useEffect(() => {
    getCategory('interests').then((res) => setCategories(res.data))
  }, [])

  const [message, setMessage] = useState<string>('')
  
  const handleCheckedItem = (item: string) => {
    if (selectedCategories.includes(item)) {
      setSelectedCategories(selectedCategories.filter(sl => sl !== item))
    } else {
      setSelectedCategories((items) => [...items, item])
    }
  }


  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      <TextTypo fw="bold" size={25} mv={15} title="Choose up to 5 interests" />
      <FlatList
         keyExtractor={(item, index) => index.toString()}      
        numColumns={3} data={categories.slice(0, 6)}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.selectContainer}>
          <TextTypo title={item}/>
          <Checkbox  status={selectedCategories.includes(item) ? 'checked' : 'unchecked'} onPress={() => handleCheckedItem(item)} />
                    </View>
      )}
      />
         
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
      textAlign: 'center'
  },
  selectContainer: {
    backgroundColor: '#F4F3F3',
    float: 'right',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    width: 97,
    height: 97
  }
  });