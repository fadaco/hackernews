import { useState, useEffect, useRef } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Platform } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux'
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { uploadImage, setUpProfile, deleteImage } from '../../store/actions/onboarding.actions';
import Footer from '../../components/footer';
import { EMPTY_URL, PLACEHOLDER_IMAGE, URL } from '../../config';
import TextTypo from '../../components/textTypo';
import * as ImagePicker from 'expo-image-picker';

export default function PhotoScreen({ route, navigation }: any) {
  const { images: Img} = useSelector((state: any) => state.onboarding);
  const { profile } = route?.params;
  const [loading, setLoading] = useState<boolean>(false);
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>('')
  const [images, setImages] = useState<any[]>([...Img]);
  const [payData, setPayData] = useState<any[]>([...Img]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const pickImage = async () => {
    try {
      let result: any = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 0.5,
      });     
      if (!result.canceled && (result.assets[0]?.uri?.toLowerCase().endsWith('jpg') || result.assets[0].uri?.toLowerCase()?.endsWith('heif') || result.assets[0].uri?.toLowerCase()?.endsWith('hei') || result.assets[0].uri?.toLowerCase()?.endsWith('png') || result.assets[0].uri?.toLowerCase()?.endsWith('heic') || result.assets[0]?.uri?.toLowerCase().endsWith('jpeg'))) {
        setIsUploading(true);
        setImages(img => [...img, {
          image: result.assets[0].uri,
          default: false
        }]);
        const res = await uploadImage(result.assets[0].uri)
        if (res.status) {
          setPayData(img => [...img, {
            image: res.data,
            default: false,
          }])
        }
        setIsUploading(false);
       } else if (result.canceled) {
        
       } else {
         setMessage('Unsupported file type...')
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

      {images.length ?
        <FlatList numColumns={3} data={images}
          keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.pickerContainer}>
            <Image defaultSource={{uri: PLACEHOLDER_IMAGE}} source={{ uri: item._id ? (URL + '' + item.image) : item.image }} style={{ width: 100, height: 100, borderRadius: 8, margin: 3 }} />
            {images.length > 1 && <TouchableOpacity style={styles.picker} onPress={() => {
              setCount(index)
              actionSheetRef.current?.show();
            }}>
              <Image source={require('../../assets/icons/cancel.png')}/>
            </TouchableOpacity>}
            </View>
          )} /> : <></>}
            
            <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
        <ActionSheet ref={actionSheetRef}>
              <View style={styles.actionsheet}>
          <TextTypo fw="bold" size={25} mb={10} title="Delete this picture?"/>
          <TextTypo mb={40} size={16} color="#6E6968" title="Are you sure you want to delete this photo?" />

          <Button loading={loading} onPress={async () => {
            setLoading(true)
            const response = await deleteImage(payData[count].image)
            if (response.status) {
               setPayData(payData.filter((_, indexs) => count !== indexs))
               setImages(images.filter((_, indexs) => count !== indexs))
               actionSheetRef.current?.hide()
            }
            setLoading(false)
          }} mode="contained" style={{ borderRadius: 8, paddingVertical: 6, backgroundColor: '#5f1489' }} labelStyle={{fontFamily: 'Averta'}}>Yes, delete</Button>
          <Button  onPress={() => actionSheetRef.current?.hide()} style={{ marginTop: 6,}} labelStyle={{fontFamily: 'Averta'}}>No, Cancel</Button>
            </View>   
        </ActionSheet>
         
      <Footer loading={loading || isUploading} title={!isUploading ? (profile ? "Update" : "Next") : "Uploading..."} submitData={async() => {
        setLoading(true)
    
        const response: any = await setUpProfile({
          type: 'images',
          name: payData
        })
       
        if (response.status) {
          navigation.navigate(profile ? 'profile' : 'complete')
        } else {
         setMessage(response.message)
          }
       
        setLoading(false)
      }} />
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
  },
  snackbar: {
    position: 'relative',
    top: -80
  }
  });