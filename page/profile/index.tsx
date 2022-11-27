import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import SettingList from '../../components/settingList';
import { URL } from '../../config';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../store/actions/onboarding.actions';
import TextTypo from '../../components/textTypo';

const settings = [
  {
    name: 'Settings',
    icon: require('../../assets/icons/settings.png'),
    url: 'profileDetail'
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


export default function ProfileScreen({navigation}: any) {
  const { full_name, age,images} = useSelector((state: any) => state.onboarding);
  const dispatch:any = useDispatch();

    return (
          <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.imageContainer}>
            <Image  style={{width: '100%', height: '100%'}} source={{
              uri: URL + '' + images[0]?.image
            }} />
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
              <TextTypo size={16} fw="bold" mt={80} title="My subscription plan" />

              </View>
          </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 25,
     // alignItems: 'center',
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
    justifyContent: 'space-between'
  }
  });