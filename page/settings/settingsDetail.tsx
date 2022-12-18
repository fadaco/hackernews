import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import TextTypo from '../../components/textTypo';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';
import { Snackbar } from 'react-native-paper';
import { setUpProfile } from '../../store/actions/onboarding.actions';

export default function SettingsDetailcreen({ route, itemId }: any) {
    const [loading, setLoading] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');
    const [message, setMessage] = useState<string>('')
    const { user_address } = useSelector((state: any) => state.onboarding);
    return (
        <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder={user_address || 'Search'}
          onPress={(data, details = null) => {
            setValue(data.description)
          }}
          listEmptyComponent={() => (
            <View style={{flex: 1}}>
              <TextTypo title="No results were found"/>
            </View>
          )}
          query={{
            key: 'AIzaSyAYr4ghmfSNWZPcMtvHD1qJDWUZPQO9Kys',
            language: 'en',
          }}
            />
         

            <Snackbar style={styles.snackbar} visible={message !== ''} onDismiss={() => setMessage('')}>{message}</Snackbar>
            <Footer loading={loading} title="Update" submitData={async () => {
                setLoading(true)
                const response = await setUpProfile({
                    type: 'user_address',
                    name: value
                })
                if (response.state) {
                    setMessage(response.message)
                }
                setLoading(false)
            }} />
            </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20
    },
    snackbar: {
        marginTop: 100
    }
})