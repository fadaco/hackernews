import { View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';


export default function Footer({navigate, title}: any) { 
    return (
        <View style={styles.footer}>
        <TouchableNativeFeedback onPress={() => navigate('register')}>
                <Text>{title }</Text>
        </TouchableNativeFeedback>
    </View>
    )
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 10,
    padding: 10,
    alignItems: 'center',
  },
  });