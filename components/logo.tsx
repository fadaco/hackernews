import { View, StyleSheet, Image } from 'react-native';


export default function Logo() { 
    return (
        <View style={styles.imageContainer}>
    <Image
      style={styles.image}
    source={require('../assets/logo.png')}
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  }
  });