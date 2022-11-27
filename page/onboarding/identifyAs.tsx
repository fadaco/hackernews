import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet } from 'react-native';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import { RadioButton, Snackbar } from 'react-native-paper';
import TextTypo from '../../components/textTypo';
import Footer from '../../components/footer';
import { IDENTIFY } from '../../data';

export default function IdentifyAsScreen({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>(IDENTIFY)
  const [value, setValue] = useState<string>('')
   const [message, setMessage] = useState<string>('')


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
      <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
      <Footer loading={loading} title="Next" submitData={async () => {
         setLoading(true)
         const response = await setUpProfile({
           type: 'identify_as',
           name: value
         })
         if (response.status) {
           navigation.navigate('race')
         } else {
           setMessage(response.message)
           }
           setLoading(false)
      }} />
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
  },
  snackbar: {
    marginTop: 100
  }
  });