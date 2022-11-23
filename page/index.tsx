import { useEffect } from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import dashboardScreen from './dashboard';
import profileScreen from './profile';
import landingScreen from './landing';
import loginScreen from './login';
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
import { setLoginValue, setUserTable } from '../store/actions/user.actions';
import { useSelector, useDispatch } from 'react-redux'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function Home() { 
    const { isLoggedIn } = useSelector((state: any) => state.user);
    const dispatch: any = useDispatch();
    
    const UserProfile = () => {
        return (
            <Stack.Navigator screenOptions={{
                headerBackTitleVisible: false,
                headerShadowVisible: false,
            }}>
                <Stack.Screen name="profileLanding" component={profileScreen} options={{
                       headerTitle: ''
                }} />
                
                 <Stack.Screen name="profileDetail" component={profileDetailScreen} options={{
                      headerShown: false
                }} />

            <Stack.Screen name="updateProfile" component={updateProfileScreen} options={{
                      headerTitle: ''
                }} />
                
                <Stack.Screen name="photo" component={photoScreen} options={{
                        headerTitle: ''
                    }} />
                
            </Stack.Navigator>
        )
    }
    

    const UserChat = () => {
        return (
            <Stack.Navigator screenOptions={{
                headerBackTitleVisible: false,
                headerShadowVisible: false,
            }}>
                <Stack.Screen name="match" component={matchScreen} options={{
                       headerShown: false
                }} />
                
                 <Stack.Screen name="chat" component={chatcreen}  />
                
            </Stack.Navigator>
        )
      }

    return (
        <>
            {isLoggedIn ?
                <>
                <Tab.Navigator
                    initialRouteName="dashboard"
                    screenOptions={{
                        headerShown: false
                      }}
                >
                     <Tab.Screen name="profile" component={UserProfile} options={{
                        tabBarIcon: ({ color, size }) => <Image source={require('../assets/icons/person.png')} />,
                            tabBarLabel: '',
                        
                    }} />
                    <Tab.Screen name="dashboard" component={dashboardScreen} options={{
                            tabBarIcon: ({ color, size }) => <Image style={{ width: 24, height: 24, borderRadius: 10}} source={require('../assets/icons/logo.png')} />,
                        tabBarLabel: '',
                        
                    }} />
            
                    <Tab.Screen name="Logout" component={UserChat} options={{
                        tabBarIcon: ({ color, size }) => <Image source={require('../assets/icons/chat.png')} />,
                        tabBarLabel: ''
                    }} />
                    </Tab.Navigator>
                    </>
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



  

