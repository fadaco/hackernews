import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Text, Button, RadioButton } from 'react-native-paper';

export default function UpdateProfileScreen({ route }: any) {
    const [value, setValue] = useState<string>('')
    const [steps, setSteps] = useState<number>(0)
    const { step } = route.params;
    useEffect(() => {
        setSteps(step)
    }, [])

    const myd = [
        {
            title: 'Do you work out?',
            icon: require('../../assets/icons/workout.png'),
            data: ['Regularly', 'Occasionally', 'Never']
        },
        {
            title: 'Do you drink?',
             icon: require('../../assets/icons/drinking.png'),
              data: ['Socially', 'Frequently', 'Never']
        },
        {
            title: 'Do you smoke?',
            icon: require('../../assets/icons/smoking.png'),
            data: ['Socially', 'Frequently', 'Never']
        },
        {
            title: 'Educational level?',
            icon: require('../../assets/icons/education.png'),
            data: ['High School', 'Undergraduate Student', 'Technical School', 'Undegraduate Degree', 'Postgraduate Student', 'Postgraduate Degree']
        },
        {
            title: 'What are you looking for?',
            icon: require('../../assets/icons/search.png'),
            data: ['Serious relationships', 'Something casual', 'Not sure']
        },
        {
            title: 'Do have a religion',
            icon: require('../../assets/icons/religion.png'),
            data: ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other']
        }
    ]
    
    const length = 6;
    return (
        <SafeAreaView style={styles.main}>
             <ScrollView style={styles.container}>
            <View style={{flex: 1}}>
            <View style={styles.barContainer}>
            {[...Array(length)].map((_, i) => (
                <View style={[styles.bar, {backgroundColor: i <= steps ? '#6b4ead' : '#E9E6E7'}]} key={i}/>
            ))}
                </View>
                    <View style={{flexDirection: 'row',  marginTop: 40, alignItems: 'center'}}>
                        <Text style={styles.text}>{myd[steps].title}</Text>
                        <Image source={myd[steps].icon} />
                </View>
                
      
      {myd[steps].data.length ? <RadioButton.Group onValueChange={(value)=> setValue(value)} value={value}>
      {myd[steps].data.map((category: string, index: number) => (
          <View style={styles.selectContainer} key={index}>
              <RadioButton.Item label={category} labelStyle={{
                fontFamily: 'Averta',
            }} value={category} />
          </View>
        ))}
                    </RadioButton.Group> : <></>}
                   
                        <Button disabled={steps === 5} onPress={() => setSteps(steps + 1)}>{steps === 5 ? 'Finish' : 'Skip'}</Button>
                </View>
            </ScrollView>
            <View style={{padding: 20}}>
                <Button style={{ borderRadius: 8, marginBottom: 5 }} mode='outlined'>Exit</Button>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#ffffff',
        flex: 1
    },
    container: {
        paddingHorizontal: 20,
     },
    barContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    },
    bar: {
        width: 50,
        height: 4,
        borderRadius: 4,
    },
    text: {
        color: '#251E1C',
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 10,
        fontFamily: 'Averta'
    },
    selectContainer: {
        backgroundColor: '#F4F3F3',
        borderRadius: 8,
        marginVertical: 5,
        height: 70,
        justifyContent: 'center'
      }
})