import { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useSelector } from 'react-redux';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import {Text, Button, RadioButton, Snackbar } from 'react-native-paper';

export default function UpdateProfileScreen({ route }: any) {
    const { percentage_completed, interests, identify_as, height, workout, drinking, smoking, education, searching_for, religion, about_me } = useSelector((state: any) => state.onboarding);
    const [loading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState<any[]>([])
    const [steps, setSteps] = useState<number>(0)
    const { step } = route.params;
    useEffect(() => {
        setSteps(step)
        setValues([{ type: 'workout', name: workout || '' }, { type: 'smoking', name: smoking || '' },
            { type: 'drinking', name: drinking || '' }, { type: 'education', name: education || '' },
            { type: 'searching_for', name: searching_for || '' },  { type: 'religion', name: religion || '' }
        ])
    }, [])

    const myd = [
        {
            title: 'Do you work out?',
            icon: require('../../assets/icons/workout.png'),
            data: ['Regularly', 'Occasionally', 'Never'],
            name: 'workout'
        },
        {
            title: 'Do you drink?',
             icon: require('../../assets/icons/drinking.png'),
            data: ['Socially', 'Frequently', 'Never'],
              name: 'drinking'
        },
        {
            title: 'Do you smoke?',
            icon: require('../../assets/icons/smoking.png'),
            data: ['Socially', 'Frequently', 'Never'],
            name: 'smoking'
        },
        {
            title: 'Educational level?',
            icon: require('../../assets/icons/education.png'),
            data: ['High School', 'Undergraduate Student', 'Technical School', 'Undegraduate Degree', 'Postgraduate Student', 'Postgraduate Degree'],
            name: 'education'
        },
        {
            title: 'What are you looking for?',
            icon: require('../../assets/icons/search.png'),
            data: ['Serious relationships', 'Something casual', 'Not sure'],
            name: 'searching_for'
        },
        {
            title: 'Do have a religion',
            icon: require('../../assets/icons/religion.png'),
            data: ['Agnostic', 'Atheist', 'Buddhist', 'Christian', 'Hindu', 'Jewish', 'Muslim', 'Other'],
            name: 'religion'
        }
    ]

    const handleSelectValue = (value: string, index: number) => {
        let tmp = [...values]
        console.log(tmp)
        const arrayIndex = tmp.findIndex((vt) => vt.type === myd[index].name);
        if (arrayIndex >= 0) {
            tmp[arrayIndex].name = value;
            setValues(tmp)
        } else {
            console.log('new')
            setValues(val => [...val, { type: myd[index].name, name: value }])
        }
    }
    
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
                
      
      {myd[steps].data.length ? <RadioButton.Group onValueChange={(value)=> handleSelectValue(value, steps)} value={values.length > 0 ? values.find(vt => vt.type === myd[steps]?.name)?.name : ''}>
      {myd[steps].data.map((category: string, index: number) => (
          <View style={styles.selectContainer} key={index}>
              <RadioButton.Item label={category} labelStyle={{
                fontFamily: 'Averta',
            }} value={category} />
          </View>
        ))}
                    </RadioButton.Group> : <></>}
                   
                    <Button disabled={steps === 5} onPress={ () => setSteps(steps + 1)}>{steps === 5 ? 'Finish' : 'Continue'}</Button>
                </View>
            </ScrollView>
            <View style={{padding: 20}}>
                <Button loading={loading} onPress={async () => {
                    setLoading(true)
                    let index = 0;
                    while (index < values.length) {
                        await setUpProfile(values[index]);
                        index++
                    }
                    if (index >= values.length) {
                        console.log('success')
                    }
                    setLoading(false)
                }} style={{ borderRadius: 8, marginBottom: 5 }} mode='outlined'>Update</Button>
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
    },
    snackbar: {
        marginTop: 100
      }
})