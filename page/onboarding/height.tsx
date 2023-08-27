import { useState, useRef } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { goToDashboard, setUpProfile } from '../../store/actions/onboarding.actions';
import { Snackbar } from 'react-native-paper';
import Footer from '../../components/footer';
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import { Picker } from '@react-native-picker/picker';
import TextTypo from '../../components/textTypo';
import { HEIGHTS } from '../../data';


export default function HeightScreen({ route, navigation }: any) {
  const { height } = useSelector((state: any) => state.onboarding);
  const { profile } = route.params;
  const [categories, setCategories] = useState<string[]>(HEIGHTS)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedLanguage, setSelectedLanguage] = useState(height);
    const actionSheetRef = useRef<ActionSheetRef>(null);
  const dispatch: any = useDispatch();
   const [message, setMessage] = useState<string>('')

  return (
    <SafeAreaView style={styles.container}>
          <TextTypo fw="bold" size={25} mb={7} title="What’s your height?" />
          <TextTypo title="Information like this helps beef up your profile"/>
          <TouchableOpacity style={styles.showHeight} onPress={() => actionSheetRef.current?.show()}>
              <TextTypo color="#251E1C" title={selectedLanguage || 'Choose your height'}/>
          </TouchableOpacity>
          <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>

          <ActionSheet ref={actionSheetRef}>
              <View style={styles.actionsheet}>
          <TextTypo fw="bold" size={25} mb={7} title="Your height" />

          <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }>
            {categories.length && categories.map((category: string, index: number) => (
              <Picker.Item key={index} label={category} style={{
                fontFamily: 'Averta'
              }} value={category} />
            ))}
          </Picker>
          <Button labelStyle={{ fontFamily: 'Averta'}} onPress={() => actionSheetRef.current?.hide()}  mode="contained" style={{ borderRadius: 8, paddingVertical: 6 }}>Choose height</Button>
          <Button labelStyle={{ fontFamily: 'Averta'}}  onPress={() => actionSheetRef.current?.hide()}  style={{marginTop: 6}}>Cancel</Button>

            </View>   
        </ActionSheet>
      <Footer loading={loading} title={profile ? "Update" : "Next"} submitData={async () => {
        setLoading(true)
        const response = await setUpProfile({
          type: 'height',
          name: selectedLanguage
        })
        if (response.status && !profile) {
          await AsyncStorage.setItem(
            'isComplete',
            'true'
          );
           dispatch(goToDashboard(2))
          await navigation.navigate('landingHome')
        } else {
          setMessage(response.message)
        }
        setLoading(true)
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
   actionsheet: {
      height: '50%',
      padding: 20
  },
  showHeight: {
    backgroundColor: '#F4F3F3',
    height: 70,
    borderRadius: 8,
    marginTop: 25,
    justifyContent: 'center',
    paddingLeft: 20
  },
  snackbar: {
    marginTop: 100
  }
  });