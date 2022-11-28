import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './dashboard';
import { getUser } from '../store/actions/onboarding.actions';
import { getUserMatches, getConversations, getLikes } from '../store/actions/match.actions';
import profileScreen from './profile';
import landingScreen from './landing';
import { Avatar, Badge } from 'react-native-paper';
import loginScreen from './login';
import { dispatchUserDetailToStore, dispatchChatToStore } from '../store/actions/onboarding.actions';
import otpScreen from './onboarding/otp';
import nameScreen from './onboarding/name';
import dobScreen from './onboarding/dob';
import identifyAsScreen from './onboarding/identifyAs';
import raceScreen from './onboarding/race';
import intentionScreen from './onboarding/intention';
import interestedInScreen from './onboarding/interestedIn';
import photoScreen from './onboarding/photo';
import otpVerifyScreen from './onboarding/otpVerify';
import likeScreen from './onboarding/likes';
import completeScreen from './onboarding/complete';
import heightScreen from './onboarding/height';
import profileDetailScreen from './profile/profileDetail';
import updateProfileScreen from './profile/updateProfile';
import matchScreen from './match';
import chatcreen from './chat';
import interestFieldScreen from '../components/interestField';
import sportScreen from '../components/sport';
import userLikeScreen from './userlikes';
import { useSelector, useDispatch } from 'react-redux'
import socket from '../shared/socket';
import jwt_decode from "jwt-decode";
import TextTypo from '../components/textTypo';
import { EMPTY_URL } from '../config';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Home() { 
    const { isLoggedIn } = useSelector((state: any) => state.user);
    const { _id } = useSelector((state: any) => state.onboarding);
    const { user_chat, user_message } = useSelector((state: any) => state.match);

    const [isProfileCompleted, setIsProfileCompleted] = useState(false)
    const [isConnected, setIsConnected] = useState(socket.connected);
    const dispatch: any = useDispatch();

    
    socket.on('connect', () => {
        setIsConnected(true);
      });

    const getIsLoggedIn = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const isComplete = await AsyncStorage.getItem('isComplete');
            if (token !== null && isComplete !== null) {
               const userId: any = jwt_decode(token);
              setIsProfileCompleted(true)
              dispatch(getUser());
              dispatch(getLikes())
               dispatch(getUserMatches())
              dispatch(getConversations())
                
                socket.emit('addUser', {
                      id: userId.id,
                      deviceId: 3
                })
                
                socket.on('getUsers', (data) => {   
                    console.log(data)  
              dispatch(dispatchUserDetailToStore({socket_id: data[userId.id].socketId}))
                })
                
                socket.on('getMessage', (data) => { 
                    dispatch(dispatchChatToStore(data))
                })

              socket.on('disconnect', () => {
                setIsConnected(false);
              });
          } else {
            setIsProfileCompleted(false)
          }
        } catch (error) {
          console.log('error')
        }
    };

    useEffect(() => {
        try {
            getIsLoggedIn();
            
        } catch (e) {
            console.log(e)
        }
    }, [])

   

    return (
        <>
            {((isLoggedIn || isProfileCompleted)) ?
                <Stack.Navigator>
                    <Stack.Screen name="landingHome" component={TabPage} options={{ headerShown: false }} />
                    <Stack.Screen name="chat" component={chatcreen} options={{
                    headerTitle: () => <View>
                        <Image style={{width: 32, height: 32, borderRadius: 50}} source={{
                            uri: user_chat?.images?.length ? URL + '' + user_chat.images[0].image : EMPTY_URL
                        }} />
                        <TextTypo title={ user_chat.full_name} mt={4} ta="center" />
                    </View>,
                    headerRight: () => (<Avatar.Icon style={{backgroundColor: 'none'}} size={40} color="#5f1489"  icon="dots-vertical" />),
                    }} />

                      <Stack.Screen name="profileDetail" component={profileDetailScreen} options={{
                        headerTitle: '',
                        headerBackTitle: ''
                }} />

                    <Stack.Screen name="updateProfile" component={updateProfileScreen} options={{
                        headerTitle: ''
                    }} />

                    <Stack.Screen name="identifyAs" component={identifyAsScreen} options={{
                                            headerTitle: ''
                    }} />
                    
                    <Stack.Screen name="height" component={heightScreen} options={{
                       headerTitle: ''
                    }} />

                    <Stack.Screen name="interested" component={interestFieldScreen} options={{
                       headerTitle: ''
                    }} />

                    <Stack.Screen name="sports" component={sportScreen} options={{
                       headerTitle: ''
                    }} />

                    <Stack.Screen name="intention" component={intentionScreen} options={{
                        headerTitle: ''
                    }} />
                    
                    <Stack.Screen name="photo" component={photoScreen} options={{
                        headerTitle: '',
                        headerBackTitle: ''
                        }} />
                </Stack.Navigator>
                :  
                <Stack.Navigator screenOptions={{
                    headerBackTitleVisible: false,
                    headerShadowVisible: false,
                    headerTitleStyle: {
                        fontFamily: 'Averta',
                    },
                    headerTintColor: '#6b4ead'
                }}>
                   
                    <Stack.Screen name="landing" component={landingScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="login" component={loginScreen} options={{
                        headerTitle: 'Sign up',
                        headerBackVisible: false
                    }} />
                    <Stack.Screen name="otp" component={otpScreen}  options={{
                        headerTitle: 'Verify your email'
                    }}/>
                    <Stack.Screen name="otpVerify" component={otpVerifyScreen} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="name" component={nameScreen}  options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="dob" component={dobScreen} options={{
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="identifyAs" component={identifyAsScreen} options={{
                        headerTitle: ''
                    }}/>
                    <Stack.Screen name="race" component={raceScreen}  options={{
                        headerTitle: ''
                    }}/>
                    <Stack.Screen name="intention" component={intentionScreen} options={{
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="interestedIn" component={interestedInScreen}  options={{
                        headerTitle: ''
                    }}/>
                    <Stack.Screen name="photo" component={photoScreen} options={{
                        headerTitle: ''
                    }} />
                    <Stack.Screen name="likes" component={likeScreen} options={{
                        headerTitle: ''
                    }} />
                     <Stack.Screen name="complete" component={completeScreen} options={{
                       headerShown: false
                    }} />
                     <Stack.Screen name="height" component={heightScreen} options={{
                       headerTitle: ''
                    }} />
                     
                </Stack.Navigator> 
               } 
            </>
    );
}


const TabPage = () => {
    const { user_chat, user_message } = useSelector((state: any) => state.match);
    const dispatch: any = useDispatch();
    return (
        <Tab.Navigator
        initialRouteName="dashboard"
        screenOptions={{
            headerShown: false
          }}
        >
            <Tab.Screen name="profile" component={profileScreen} options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="account-outline" color={color} size={size} />,
                    tabBarLabel: '',
                
            }} />

            <Tab.Screen name="dashboard" component={DashboardScreen} options={{
                    tabBarIcon: ({ color, size }) => <Image style={{ width: 24, height: 24, borderRadius: 10}} source={require('../assets/icons/logo.png')} />,
                tabBarLabel: '',
                
                }} />
            
            <Tab.Screen name="userLike" component={userLikeScreen} options={{
                tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cards-heart-outline" color={color} size={size} />,
                tabBarLabel: '',
            }} />

            <Tab.Screen name="user" component={matchScreen} options={{
                    tabBarIcon: ({ color, size }) => <View style={{position: 'relative'}}><MaterialCommunityIcons name="chat-outline" color={color} size={size} /><Badge size={5} visible={user_message.length > 0} style={{position: 'absolute'}} /></View>,
                tabBarLabel: ''
            }} />
        </Tab.Navigator>

    )
}


  

