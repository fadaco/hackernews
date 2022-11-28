import { useState, useEffect } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet } from 'react-native';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import { RadioButton, Snackbar } from 'react-native-paper';
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';
import { RACE } from '../../data';


export default function RaceScreen({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>(RACE)
  const [value, setValue] = useState<string>('')
   const [message, setMessage] = useState<string>('')

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
      <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
      <Footer loading={loading} title="Next" submitData={async () => {
         setLoading(true)
         const response = await setUpProfile({
           type: 'describe_yourself',
           name: value
         })
         if (response.status) {
           navigation.navigate('intention', {
            profile: false
          })
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