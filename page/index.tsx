import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import storiesScreen from './stories';
import aboutScreen from './about-us';
import loginScreen from './login';
import registerScreen from './register';
import { setLoginValue, setUserTable } from '../store/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux'
import * as SQLite from 'expo-sqlite';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const db = SQLite.openDatabase('dbs.myDb')


export default function Home() { 
    const { isLoggedIn } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    
    useEffect(() => {
        createTable();
    }, [])
    
    useEffect(() => {
        dispatch(setUserTable(db));
    }, [db])

    const createTable = async () => {
        await db.transaction((tx) => {
          tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Users "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME Text, Email Text NOT NULL UNIQUE, Password Text);"
          )
        })
      }

    return (
        <>
            {isLoggedIn ?
                <Tab.Navigator>
                    <Tab.Screen name="stories" component={storiesScreen} options={{
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color={color} size={size} />,
                        title: 'Top Stories'
                    }} />
                    <Tab.Screen name="about" component={aboutScreen} options={{
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color={color} size={size} />,
                        title: 'About Us'
                    }} />
                    <Tab.Screen name="Logout" component={() => null} options={{
                        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="logout" color={color} size={size} />,
                        tabBarButton: props => <TouchableOpacity {...props} onPress={() =>  dispatch(setLoginValue(false))
                        }/>
                    }} />
                </Tab.Navigator>
                :  
                <Stack.Navigator screenOptions={{
                    headerShown: false
                  }}>
                    <Stack.Screen name="login" component={loginScreen} />
                    <Stack.Screen name="register" component={registerScreen}  />
             </Stack.Navigator> 
               } 
            </>
    );
}



  

