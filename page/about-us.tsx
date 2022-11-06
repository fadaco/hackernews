import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux'

export default function About() {
  const { user } = useSelector((state: any) => state.user);
  console.log(user);
    return (
          <View style={styles.container}>
        <Text>This Page is currently been view</Text>
        <Text>{`by ${user?.full_name}`}</Text>
        <Text>{`Email: ${user?.email}` }</Text>
          </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });