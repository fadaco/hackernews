import { useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setLoginValue, setUserValue } from '../store/actions/user.actions';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import {User} from '../store/type'
import bcrypt from 'react-native-bcrypt'
import Logo from '../components/logo';
import Footer from '../components/footer';

export default function Login({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
    password: ''
  })
  
  const { db } = useSelector((state: any) => state.user);
  const dispatch: any = useDispatch();
   const [message, setMessage] = useState<string>('')

   const fetchData = () => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "SELECT * FROM Users WHERE EMAIL=?",
        [userParam.email.toLowerCase()],
        (tx: any, result: any) => {
          let row = result.rows.length;
          console.log(result);
          if (row > 0) {
            const data = result.rows._array;
            data.forEach((dt: any) => {
              console.log(bcrypt.compareSync(userParam.password, dt.Password));// true
              if (bcrypt.compareSync(userParam.password, dt.Password)) {
                dispatch(setUserValue(dt));
                dispatch(setLoginValue(true))
              } else {
                setMessage('Incorrect Password')
              }
            })

          } else {
            setMessage('User does not exist')
          }
        }
      )
    })
  }

  const handleUserInput = (text: string, type: string) => {
    setMessage('');
    setUserParam({
      ...userParam,
      [type]: text
    })
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Logo/>
      <View style={styles.container}>
        <TextInput label="Email" onChangeText={text => handleUserInput(text, 'email')}/>
           <TextInput secureTextEntry style={{ marginVertical: 20 }} onChangeText={text => handleUserInput(text, 'password')} label="Password" /> 
        <Button onPress={() => fetchData()} mode="contained">Login</Button> 
       
      </View>
      <View style={{marginTop: 200}}>
      <Snackbar visible={message !== ''} onDismiss={() => setMessage('')}>
          <Text style={styles.snackbar}>{message}</Text>
        </Snackbar>
        </View>
      <Footer title="Register" navigate={() => navigation.navigate('register')}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItem: 'center',
     justifyContent: 'center',
      textAlign: 'center'
  },
  snackbar: {
    color: '#ffffff',
    textAlign: 'center',
  }
  });