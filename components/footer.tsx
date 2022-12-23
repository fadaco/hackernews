import { View, StyleSheet, TouchableNativeFeedback, Text } from 'react-native';

import { Button, useTheme } from 'react-native-paper';


export default function Footer({submitData, title, loading, isText, complete, disabled}: any) { 
    return (
      <View style={styles.footer}>
        {isText ? <Text style={styles.text}>Meet people with different background, race around the world</Text> : <></>}
        <Button labelStyle={{ fontFamily: 'Averta'}} disabled={disabled} color={complete ? '#5f1489' : ''} mode={complete ? "text" : "contained"} style={complete ? styles.buttons : styles.button} loading={loading}  onPress={submitData}>{title}</Button>
      </View>
    )
}

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    height: 20,
    padding: 10,
    width: '100%'
  },
  button: {
    borderRadius: 8,
    paddingVertical: 6,
    backgroundColor: '#5f1489',
    fontFamily: 'Averta'
  },
  buttons: {
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#6b4ead',
    paddingVertical: 6,
    fontFamily: 'Averta'
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Averta'
  }
  });