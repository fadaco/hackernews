import { View, StyleSheet, Image } from 'react-native';


export default function Logo({type}: any) { 
    return (
        <View style={styles.imageContainer}>
    <Image
      style={type ? styles.photo : styles.image}
    source={type ? require('../assets/landing-logo.png') : require('../assets/icons/logo.png')}
      />
</View>
    )
}

const styles = StyleSheet.create({
  image: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {},
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  }
  });