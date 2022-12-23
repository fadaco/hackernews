import { useState } from "react";
import { TextInput, FlatList, View, StyleSheet } from "react-native";
export default function OtpInput() {
    const inputs = Array(4).fill(0);
    const [focusStep, setFocusStep] = useState(1)


    const txt = inputs.map((i) => (
        <TextInput/>
    ))

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TextInput maxLength={1} style={styles.input} autoFocus={focusStep === 1} onChangeText={(text) => setFocusStep(focusStep + 1)} />
        <TextInput maxLength={1} style={styles.input} autoFocus={focusStep === 2} />
        <TextInput maxLength={1} style={styles.input} autoFocus={focusStep === 3}/>
            <TextInput maxLength={1} style={styles.input} autoFocus={focusStep === 4}/>
        </View>

        
    );

}

const styles = StyleSheet.create({
    input: {
        width: 60,
        height: 50,
        borderWidth: 1,
        borderColor: 'green',
    }
})