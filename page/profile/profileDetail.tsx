import {  useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { setUpProfile } from '../../store/actions/onboarding.actions';
import {Text,Chip, TextInput, Avatar } from 'react-native-paper';
import { useSelector , useDispatch} from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getUser } from '../../store/actions/onboarding.actions';
import TextTypo from '../../components/textTypo';

export default function ProfileDetailScreen({navigation}: any) {
    const { percentage_completed, interests, identify_as, height, workout, drinking, smoking, education, searching_for, religion, about_me, intention, subscription } = useSelector((state: any) => state.onboarding);
    const dispatch: any = useDispatch();
    const [text, setText] = useState<string>(about_me);

    useFocusEffect(
        useCallback(() => {
            dispatch(getUser())
        }, [])
    );
    

    const handleAboutUs = async (e: any) => {
        await setUpProfile({
            type: 'about_me',
            name: e.nativeEvent.text
        })
    }
    
     
    return (
        <SafeAreaView style={styles.main}>
            <FlatList style={styles.container}
                  keyExtractor={(item, index) => index.toString()}      
                  data={[1]}
                renderItem={({ item }) => (
                    <View style={{paddingBottom: 50}}>
            <View style={{backgroundColor: '#9792ab', padding: 10, borderRadius: 5}}>
                <TextTypo title="Profile Strength"/>
             <View style={styles.profileRangeContainer}>
                <View style={[styles.profileRange, {width:percentage_completed + '%' }]}/>    
                    </View>
                        <TextTypo title={(percentage_completed > 100 ? 100 : percentage_completed) + '%'}/>

                </View>
                
                <View style={{marginTop: 40}}>
                    <TextTypo title="Interests" />
                    <View style={styles.direction}>
                            <View style={{ marginVertical: 10 }}>
                                <FlatList
                                 keyExtractor={(item, index) => index.toString()}      
                                    numColumns={3} data={interests}
                                    renderItem={({ item, index }) => (
                                        <Chip key={index}  style={{margin: 4}}>
                                        <TextTypo title={ item} />
                                    </Chip>
                                    )}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('interested', {
                                    profile: true
                                })}>
                                    <Image source={require('../../assets/icons/edit.png')}/>
                                </TouchableOpacity>
                        <View></View>
                    </View>
                        </View>


                        


                <View style={{marginTop: 40}}>
                <TextTypo title="About me"/>
                    <TextInput value={text} onChangeText={(text) => setText(text)}  onEndEditing={(e) => handleAboutUs(e)} style={{fontFamily: 'Averta'}} numberOfLines={8} placeholder='Write something about yourself' multiline/>
                </View>

                <View style={{marginTop: 40}}>
                <TextTypo title="Plan"/>
                    <TouchableOpacity style={styles.tabContainer}>
                                <View>
                                    <TextTypo color="#3D3735" title={subscription} />
                                </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>
                        <TextTypo title="Personal information" />
                            <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('identifyAs', {
                                profile: true
                            })}>
                        <View><TextTypo color="#3D3735" title={identify_as + " (Gender)"} /></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('intention', {
                                profile: true
                            })}>
                                <View><TextTypo color="#3D3735" title={intention || "What are your intention"} />
                                </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View><Text style={{color: '#3D3735', fontFamily: 'Averta',}}>Home town</Text></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('height', {
                                profile: true
                            })}>
                            <View style={styles.directions}>
                          
                            <Image source={require('../../assets/icons/height.png')}/>
                                <TextTypo color="#3D3735" ml={10} title={ 'Height ' + height} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                        <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                            step: 0
                    })}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/workout.png')}/>
                            <TextTypo color="#3D3735" ml={10} title={workout || 'Workout'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                        step: 1
                    })}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/drinking.png')}/>
                            <TextTypo color="#3D3735" ml={10} title={drinking || 'Drinking'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                        step: 2
                    })}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/smoking.png')}/>
                            <TextTypo color="#3D3735" ml={10} title={smoking || 'Smoking'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                        step: 3
                    })}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/education.png')}/>
                            <TextTypo color="#3D3735" ml={10} title={education || 'Education'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                        step: 4
                    })}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/search.png')}/>
                            <TextTypo color="#3D3735" ml={10} title={searching_for || 'What are you searching for'} />
                        </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer} onPress={() => navigation.navigate('updateProfile', {
                        step: 5
                    })}>
                        <View style={styles.directions}>
                        <Image source={require('../../assets/icons/religion.png')}/>
                        <TextTypo color="#3D3735" ml={10} title={religion || 'Religion'} />
                            </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>


        </View>
            )}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 20,
    },
    direction: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    directions: {
        flexDirection: 'row',
    },
    profileRangeContainer: {
        width: '100%',
        height: 6,
        backgroundColor: '#ccc',
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 15
    },
    profileRange: {
        height: 6,
        backgroundColor: '#6b4ead'
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F4F4F4',
        borderRadius: 6,
        height: 40,
        alignItems: 'center',
        paddingHorizontal: 10,
        marginVertical: 5
    },
    text: {
        color: '#9E9B9A',
        marginLeft: 10,
        fontFamily: 'Averta',
    }
  });