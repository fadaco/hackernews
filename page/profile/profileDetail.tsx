import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {Text,Chip, TextInput, Avatar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import TextTypo from '../../components/textTypo';


export default function ProfileDetailScreen({navigation}: any) {
  const { user } = useSelector((state: any) => state.user);
    return (
        <SafeAreaView style={styles.main}>
          <ScrollView style={styles.container}>
        <View>
            <View style={{backgroundColor: '#9792ab', padding: 10, borderRadius: 5}}>
                <TextTypo title="Profile Strength"/>
             <View style={styles.profileRangeContainer}>
                <View style={styles.profileRange}/>    
                    </View>
                        <TextTypo title="40%"/>

                </View>
                
                <View style={{marginTop: 40}}>
                    <TextTypo title="Interests" />
                    <View style={styles.direction}>
                        <View style={{marginVertical: 10}}>
                                <Chip>
                                    <TextTypo title="Music"/>
                            </Chip>
                        </View>
                        <View></View>
                    </View>
                </View>

                <View style={{marginTop: 40}}>
                <TextTypo title="About me"/>
                    <TextInput style={{fontFamily: 'Averta'}} numberOfLines={8} placeholder='Write something about yourself' multiline/>
                </View>

                <View style={{marginTop: 40}}>
                <TextTypo title="Work"/>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View><Text style={{color: '#9E9B9A', fontFamily: 'Averta'}}>Add Work</Text></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>
                        <TextTypo title="Personal information" />
                    <TouchableOpacity style={styles.tabContainer}>
                        <View><Text style={{color: '#9E9B9A', fontFamily: 'Averta',}}>Male (Gender)</Text></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View><Text style={{color: '#9E9B9A', fontFamily: 'Averta',}}>Where i live</Text></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View><Text style={{color: '#9E9B9A', fontFamily: 'Averta',}}>Home town</Text></View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>
                    <TouchableOpacity style={styles.tabContainer}>
                        <View style={styles.directions}>
                            <Image source={require('../../assets/icons/height.png')}/>
                            <Text style={styles.text}>Height 185cm</Text>
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
                            <Text style={styles.text}>Workout</Text>
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
                            <Text style={styles.text}>Drinking</Text>
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
                            <Text style={styles.text}>Smoking</Text>
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
                            <Text style={styles.text}>Education</Text>
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
                            <Text style={styles.text}>Searching For</Text>
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
                                <Text style={styles.text}>Religion</Text>
                            </View>
                        <View>
                        <Avatar.Icon style={{backgroundColor: '#F4F4F4'}} size={24} icon="greater-than" />
                        </View>
                    </TouchableOpacity>
                </View>


        </View>
            
            </ScrollView>
            </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
       
       padding: 25,
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
        width: '40%',
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