import { useState, useEffect } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, FlatList } from 'react-native';
import {dispatchUserDetailToStore} from '../store/actions/onboarding.actions'
import { useDispatch } from 'react-redux'
import {  Checkbox, Snackbar } from 'react-native-paper';
import TextTypo from './textTypo';
import { SPORTS } from '../data';


export default function InterestFieldScreen({ navigation }: any) {
  const [categories, setCategories] = useState<string[]>(SPORTS)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const dispatch: any = useDispatch();
   const [message, setMessage] = useState<string>('')

   useEffect(() => {
    dispatch(dispatchUserDetailToStore({sports: selectedCategories}))
  }, [selectedCategories.length])
  
  const handleCheckedItem = (item: string) => {
    if (selectedCategories.includes(item)) {
      setSelectedCategories(selectedCategories.filter(sl => sl !== item))
    } else {
      if (selectedCategories.length < 5) {
       setSelectedCategories((items) => [...items, item])
      } else {
        setMessage('You can only select 5 interests')
      }
    }
  }


  return (
    <SafeAreaView style={styles.container}>
            <TextTypo fw="bold" size={25} mv={15} title="What kind of sports do you like?" />
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
       <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>    
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
  },
  snackbar: {
    marginTop: 100
  }
  });