import { useEffect, useState } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { setLoginValue } from '../store/actions/user.actions';
import { TextInput,Button, Snackbar } from 'react-native-paper';
import { User } from '../store/type'
import bcrypt from 'react-native-bcrypt'
import Logo from '../components/logo';
import Footer from '../components/footer';


export default function Register({navigation}: any) {
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
    password: ''
   })
    const { user, db } = useSelector((state: any) => state.user);
    const [message, setMessage] = useState<string>('')
   const dispatch: any = useDispatch();


 

    const setData = async () => {
        if (!userParam.full_name || !userParam.email || !userParam.password) {
            setMessage('All the field are required');
            return;
        }
      
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(userParam.password, salt);
    await db.transaction(async (tx: any) => {
      await tx.executeSql(
        "INSERT INTO Users (Name, Email, Password) VALUES (?,?,?)",
        [userParam.full_name.toLowerCase(), userParam.email.toLowerCase(), hash],
          (tx: any, result: any) => {
              if (result.rowsAffected) {
                setMessage('User successfully created')
               }              
        }
      );
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
        <TextInput style={{ marginVertical: 20 }} label="Name" onChangeText={text => handleUserInput(text, 'full_name')}/>
        <TextInput label="Email" onChangeText={text => handleUserInput(text, 'email')}/>
        <TextInput secureTextEntry style={{ marginVertical: 20 }} onChangeText={text => handleUserInput(text, 'password')} label="Password" /> 
        <Button onPress={() => setData()} mode="contained">Register</Button> 
      </View>
      <View style={{marginTop: 200}}>
      <Snackbar visible={message !== ''} onDismiss={() => setMessage('')}>
          <Text style={styles.snackbar}>{message}</Text>
      </Snackbar>
      </View>
      <Footer title="Login" navigate={() => navigation.navigate('login')}/>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
       padding: 20
  },
  snackbar: {
    color: '#ffffff',
    textAlign: 'center'
  }
  });