import SafeAreaView from 'react-native-safe-area-view';
import { View, StyleSheet, Image } from 'react-native';
import Footer from '../../components/footer';
import TextTypo from '../../components/textTypo';

export default function CompleteScreen({navigation}: any) {
  
  return (
      <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 40 }}>
        <View style={{width: 50, height: 50}}>
        <Image style={{width: 50, height: 50}} source={require('../../assets/icons/logo.png')}/>
        </View>
      <TextTypo fw="bold" size={25} mv={30} color="#ffffff" title="The workings of the app" />
      <TextTypo mb={20} color="#ffffff"  title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod" />
      </View>
      <Footer title="Yep, Got it" complete submitData={() => navigation.navigate('likes')}/>
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
    backgroundColor: '#5f1489'
  }
  });