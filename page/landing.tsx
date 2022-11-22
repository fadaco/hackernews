import SafeAreaView from 'react-native-safe-area-view';
import { Text, StyleSheet } from 'react-native';
import Logo from '../components/logo';
import Footer from '../components/footer';

export default function LandingScreen({navigation}: any) {
  
  return (
    <SafeAreaView style={styles.container}>
      <Logo type/>
      <Footer isText title="Get Started" submitData={() => navigation.navigate('login')}/>
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
  });