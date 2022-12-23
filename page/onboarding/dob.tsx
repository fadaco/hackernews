import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'
import { Snackbar } from 'react-native-paper';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import TextTypo from '../../components/textTypo';
import Footer from '../../components/footer';
import DatePicker from '@dietime/react-native-date-picker';


export default function DobScreen({ navigation }: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState<any>(new Date());
 
  
  const { full_name } = useSelector((state: any) => state.onboarding);
   const [message, setMessage] = useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
          <TextTypo fw="bold" size={25} mb={7} title={`Hi, ${full_name}!`} />
          <TextTypo fw="bold" size={25} mb={7} title="When is your birthday?"/>
      <DatePicker value={date}  onChange={(value) => setDate(value)}
         format="dd-mm-yyyy" startYear={1960} endYear={2005}
      />
        <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
      <Footer loading={loading} title="Next" submitData={async () => {
             setLoading(true)
              const response = await setUpProfile({
                type: 'date_of_birth',
                name: date.getDate() + '-' + (Number(date.getMonth()) + 1)+ '-' + date.getFullYear()
              })
              if (response.status) {
                navigation.navigate('identifyAs', {
                  profile: false
                })
              } else {
                setMessage(response.message)
                }
                setLoading(false)
                    
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
  snackbar: {
    marginTop: 100
  }
  });