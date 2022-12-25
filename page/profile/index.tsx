import { useState, useCallback } from 'react';
import { View, StyleSheet,Image, ScrollView, Alert} from 'react-native';
//import {Image} from "react-native-expo-image-cache";
import CachedImage from '../../components/cachedImage';
import {useStripe, StripeProvider } from '@stripe/stripe-react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useFocusEffect } from '@react-navigation/native';
import SettingList from '../../components/settingList';
import { PLACEHOLDER_IMAGE, URL } from '../../config';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../store/actions/onboarding.actions';
import { upgradeSubscriptionPlan } from '../../store/actions/match.actions';
import TextTypo from '../../components/textTypo';
import {IconButton, Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';


const settings = [
  {
    name: 'Settings',
    icon: require('../../assets/icons/settings.png'),
    url: 'settings'
  },
  {
    name: 'Edit profile',
    icon: require('../../assets/icons/edit-profile.png'),
    url: 'profileDetail'
  },
  {
    name: 'Add Photos',
    icon: require('../../assets/icons/add-photo.png'),
    url: 'photo'
  }
]

const subscriptions = [
  {
    name: 'STANDARD',
    swipe: 'unlimited',
    incognito: false,
    price: '$20 in 6 months',
    amount: 20,
    boost: false,
    admirer: true
  },
  {
    name: 'ULTRA',
    swipe: 'unlimited',
    incognito: true,
    price: '$35 in 6 months',
    amount: 35,
    boost: true,
    admirer: true
  }
]


export default function ProfileScreen({navigation}: any) {
  const { full_name, age, images } = useSelector((state: any) => state.onboarding);
  const [value, setValue] = useState<string>('standard');
  const [disabled, setDisabled] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const stripe = useStripe();
  
  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, [])
  );

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <View>
          <View style={styles.imageContainer}>
            <CachedImage style={{width: '100%', height: '100%'}} url={URL + '' + images[0]?.image} />
            </View>
          <TextTypo title={full_name + ', ' + age} size={24} fw="bold" mt={10} ta="center" />
          <View style={styles.profile}>
          {settings.map((setting, index) => (
            <SettingList onPress={() => navigation.navigate(setting.url, {
              profile: true
            }) } key={index} text={setting.name} icon={setting.icon}  />
          ))}
          </View>
          </View>
         
              <View>
            <TextTypo size={16} fw="bold" mt={50} title="My subscription plan" />
            <Picker
              selectedValue={value}
              onValueChange={(itemValue, itemIndex) =>
                setValue(itemValue)
              }
            >
              <Picker.Item fontFamily="Averta" label="Standard" value="standard" />
                  <Picker.Item fontFamily="Averta"  label="Ultra" value="ultra"/>
            </Picker>
            
            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Name" />
              <TextTypo title={subscriptions[value === 'standard' ? 0 : 1].name}/>
            </View>

            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Swipe Count" />
              <TextTypo title={subscriptions[value === 'standard' ? 0 : 1].swipe}/>
            </View>

            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Incognito" />
              <IconButton style={styles.icon} size={20} icon={subscriptions[value === 'standard' ? 0 : 1].incognito ? "check-bold" : 'close-thick'} />
            </View>

            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Boost" />
              <IconButton style={styles.icon} size={20} icon={subscriptions[value === 'standard' ? 0 : 1].boost ? "check-bold" : 'close-thick'} />
            </View>

            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Admirer" />
              <IconButton style={styles.icon} size={20} icon={subscriptions[value === 'standard' ? 0 : 1].admirer ? "check-bold" : 'close-thick'} />
            </View>

            <View style={styles.iconTab}>
              <TextTypo fontFamily="Averta Bold" title="Price" />
              <TextTypo title={subscriptions[value === 'standard' ? 0 : 1].price}/>
            </View>
              
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 25}}>
          <Button disabled={disabled} style={styles.button} labelStyle={{ fontFamily: 'Averta' }} mode="contained" onPress={async () => {
            setDisabled(true)
            const response = await upgradeSubscriptionPlan({
              name: value.toUpperCase(),
              price: subscriptions[value === 'standard' ? 0 : 1].amount
            })
            if (response.status) {
              const initSheet = await stripe.initPaymentSheet({
                paymentIntentClientSecret: response.data,
                merchantDisplayName: 'Upgrade plan'
              })
              if (initSheet.error) {
                Alert.alert(initSheet.error.message)
              }

              const presentSheet = await stripe.presentPaymentSheet();
              console.log(presentSheet)
              if (presentSheet.error) {
                return Alert.alert(presentSheet.error.message)
              }

              Alert.alert('Upgrade successful')
              return;
            }
            setDisabled(false)
            Alert.alert(response.message)
        }}>Upgrade Plan</Button>
          </View>
          </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 25,
    paddingBottom: 40
  },
    imageContainer: {
      width: 144,
      height: 144,
      alignSelf: 'center',
      marginTop: 20,
      borderRadius: 100,
      overflow: 'hidden'
    },
  
  profile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subContainer: {
    width: '100%',
    marginRight: 20,
    backgroundColor: 'yellow'
  },
  icon: {
    backgroundColor: 'transparent'
  },
  iconTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContet: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  button: {
    borderRadius: 8,
    backgroundColor: '#5f1489',
    fontFamily: 'Averta'
  },
  standard: {
    //backgroundColor: 'red'
  },
  ultra: {
   // backgroundColor: 'green'
  }
  });