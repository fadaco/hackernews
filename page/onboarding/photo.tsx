import { useState, useEffect, useRef } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { TextInput, Button } from 'react-native-paper';
import { User } from '../../store/type'
import ActionSheet, {ActionSheetRef} from "react-native-actions-sheet";
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';
import * as ImagePicker from 'expo-image-picker';


export default function PhotoScreen({ route, navigation }: any) {
  const { profile } = route?.params;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [count, setCount] = useState<number>(0);
  const [userParam, setUserParam] = useState<User>({
    full_name: '',
    email: '',
  })
  
  
  const [images, setImages] = useState<string[]>([]);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

      let result: any = await ImagePicker.launchImageLibraryAsync();
    
      if (!result.cancelled) {
        setImages(img => [...img, result.uri]);
      }
    } catch (error) {
      console.log(error)
      
    }
   
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextTypo fw="bold" size={25} mb={30} title="Let’s upload some photos" />
      <TextTypo mb={20} title="You can select up to 6 photos" />

      {images.length < 6 ? <TouchableOpacity onPress={() => pickImage()} style={{marginBottom: 20}}>
        <Image source={require('../../assets/icons/placeholder.png')}/>
      </TouchableOpacity> : <></>}

      {images.length ? <FlatList numColumns={3} data={images}
       keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
            <View style={styles.pickerContainer}>
            <Image source={{ uri: item }} style={{ width: 100, height: 100, borderRadius: 8, margin: 3 }} />
            <TouchableOpacity style={styles.picker} onPress={() => {
              setCount(index)
              actionSheetRef.current?.show();
            }}>
              <Image source={require('../../assets/icons/cancel.png')}/>
            </TouchableOpacity>
            </View>
        )} /> : <></>}
      
        <ActionSheet ref={actionSheetRef}>
              <View style={styles.actionsheet}>
          <TextTypo fw="bold" size={25} mb={10} title="Delete this picture?"/>
          <TextTypo mb={40} size={16} color="#6E6968" title="Are you sure you want to delete this photo?" />

          <Button onPress={() => {
            setImages(images.filter((_, indexs) => count !== indexs))
            actionSheetRef.current?.hide()
          }} mode="contained" style={{ borderRadius: 8, paddingVertical: 6, backgroundColor: '#5f1489' }} labelStyle={{fontFamily: 'Averta'}}>Yes, delete</Button>
          <Button  onPress={() => actionSheetRef.current?.hide()} style={{ marginTop: 6,}} labelStyle={{fontFamily: 'Averta'}}>No, Cancel</Button>
            </View>   
        </ActionSheet>
  
     
         
      <Footer title={profile ? "Update" : "Next"} submitData={() => navigation.navigate(profile ? 'profile' : 'complete')}/>
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
    height: '40%',
    padding: 20
},
  pickerContainer: {
    position: 'relative'
  },
  picker: {
    position: 'absolute',
    right: -5,
    bottom: -10
  }
  });