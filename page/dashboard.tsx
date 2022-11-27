import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import SafeAreaView from 'react-native-safe-area-view';
import { Avatar, Chip, Button } from 'react-native-paper';
import { User } from '../store/type'
import { URL, EMPTY_URL } from '../config';
import { getUserList } from '../store/actions/match.actions';
import Swiper from 'react-native-deck-swiper';
import TextTypo from '../components/textTypo';
import * as Location from 'expo-location';
import socket from '../shared/socket';

export default function Dashboard() {
  const { userList } = useSelector((state: any) => state.match);
  const { _id, socket_id, images } = useSelector((state: any) => state.onboarding);
  const [matchFound, setMatchFound] = useState<boolean>(false);

  const dispatch: any = useDispatch()
  const [userLocation, setUserLocation] = useState<any>(null)
  let swipe: any = '';
  
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    socket.on('matchFound', (data) => {
      if (data === 'user match') {
        setMatchFound(true)
      }
    })
  }, []);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
    
  useEffect(() => {
    try {
      setUserLocation(JSON.parse(text))
    } catch (e) {
      console.log(e)
       }
  
  }, [text])

 

  useEffect(() => {
    const latitude = userLocation?.coords?.latitude
    const longitude = userLocation?.coords?.longitude
    if (latitude && longitude) {
       dispatch(getUserList({
     latitude: latitude.toString(),
     longitude: longitude.toString()
   }))
    }
  }, [userLocation])

  return (
   
    <View style={styles.container}>
      {matchFound ?
        <SafeAreaView style={styles.swipeMatchContainer}>
            <View style={styles.imageSwipeContainer}>
              <Image style={[styles.imageSwipe, {left: -50}]} source={{uri: URL + '' + images[0].image}} />
              <Image style={styles.matchIcon} source={require('../assets/icons/match-icon.png')} />
              <Image style={styles.matchIcons} source={require('../assets/icons/match-icons.png')}/>
              <Image style={[styles.imageSwipe, {left: 10}]} source={require('../assets/icons/profile.png') } />
            </View>
         
          <TextTypo fw="bold" mt={80} color="#ffffff" size={18} title="Matched!" />
            <View style={{width: 177, margin: 'auto'}}>
            <TextTypo mt={70} mb={40} ta="center" color="#ffffff" title="You can now send a message to this person" />
            <Button mode="elevated">Send Message</Button>
            <Button onPress={() => setMatchFound(false)} style={{marginTop: 30}} labelStyle={{color: '#ffffff'}}>Close</Button>
            </View>
        </SafeAreaView> :
        <ScrollView>
        <View style={{ position: 'relative', height: 1320 }}>
          <Swiper
            cards={userList}
            renderCard={(user: User) => {
              return (
                <View style={[styles.card, { borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }]}>
                  <View style={{ position: 'relative', }}>
                    <Image style={{ width: '100%', height: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16 }} source={{
                      uri: user?.images?.length ? user.images[0].image : EMPTY_URL
                    }} />
                    <Text style={[styles.text, { position: 'absolute' }]}>{user?.full_name}</Text>
                    <View style={styles.swipeContainer}>
                      <TouchableOpacity style={styles.swipeButton} onPress={() => swipe.swipeLeft()}>
                        <Image source={require('../assets/icons/notlike.png')} />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.swipeButton} onPress={() => swipe.swipeRight()}>
                        <Image source={require('../assets/icons/like.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
               
                  <View style={{ backgroundColor: 'rgba(95, 20, 137, 0.1)', paddingHorizontal: 10, paddingBottom: 30, borderBottomLeftRadius: 16, borderBottomRightRadius: 16 }}>
                    <View style={{ marginVertical: 40 }}>
                      <TextTypo size={15} color="#3D3735" title="About me" />
                      <TextTypo size={18} color="#3D3735" title={user?.about_me} />
                    </View>
                  
                    <View>

                    </View>
                    <View>
                      <View style={{ width: 200, height: 200 }}>
                        <Image style={{ width: 200, height: 200 }} source={{
                          uri: user?.images?.length ? user.images[0].image : EMPTY_URL
                        }} />

                      </View>
                      <View style={{ marginVertical: 40 }}>
                        <TextTypo size={15} color="#3D3735" title="location" />
                        <TextTypo size={24} color="#3D3735" title={'card.location'} />
                      </View>
                  
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={() => swipe.swipeLeft()}>
                          <Avatar.Icon style={{ backgroundColor: '#5f1489' }} size={70} icon="close" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => swipe.swipeRight()}>
                          <Avatar.Icon style={{ backgroundColor: '#5f1489' }} size={70} icon="cards-heart" />
                        </TouchableOpacity>
                      </View>

                    </View>
                  </View>
                </View>
              )
            }}
            // onSwiped={(cardIndex) => {console.log(cardIndex)}}
            //  onSwipedAll={() => { console.log('onSwipedAll') }}
            onSwipedRight={(index) => {
              socket.emit('swipe', {
                senderId: _id,
                receiverId: userList[index]._id,
                type: 'like',
                socket_id: socket_id,
              })
            }}
            cardStyle={{ height: 'auto' }}
            cardHorizontalMargin={5}
            cardIndex={0}
            verticalSwipe={false}
            backgroundColor={'transparent'}
            stackSize={1}
            ref={(swiper) => {
              swipe = swiper
            }}
            overlayLabels={{
              left: {
                title: 'NOPE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: -30
                  }
                }
              },
              right: {
                title: 'LIKE',
                style: {
                  label: {
                    backgroundColor: 'black',
                    borderColor: 'black',
                    color: 'white',
                    borderWidth: 1
                  },
                  wrapper: {
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginTop: 30,
                    marginLeft: 30
                  }
                }
              },
            }}
            animateOverlayLabelsOpacity
            animateCardOpacity
          />
          
        </View>
      </ScrollView>}
</View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  card: {
    flex: 1,
    borderRadius: 16,
    height: 'auto',
    paddingBottom: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "transparent",
    bottom: 100,
     left: 10,
    color: '#ffffff',
    fontFamily: 'Averta',
  },
  swipeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 10,
    padding: 20,
    width: '92%',
    height: 80,
   borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  },
  swipeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.73)',
    height: 60,
    width: 60,
    borderRadius: 50,
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  swipeMatchContainer: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: '#5f1489',
  },
  imageSwipeContainer: {
    flexDirection: 'row',
    position: 'relative'
  },
  imageSwipe: {
    width: 72,
    height: 72,
    borderRadius: 50,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#5f1489',
    zIndex: 999
  },
  matchIcon: {
    position: 'relative',
    left: 3,   
    top: -28
  },
  matchIcons: {
    position: 'relative',
    left: -20,   
    bottom: -50,
  }

  });
