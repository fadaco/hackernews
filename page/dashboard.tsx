import { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TouchableWithoutFeedback, FlatList, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { getUserList, dispatchUserDetailToChat, reloadPage } from '../store/actions/match.actions';
import SafeAreaView from 'react-native-safe-area-view';
import { Avatar, Chip, Button, Modal } from 'react-native-paper';
import { User } from '../store/type'
import { URL, EMPTY_URL, PLACEHOLDER_IMAGE } from '../config';
import Swiper from 'react-native-deck-swiper';
import TextTypo from '../components/textTypo';
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import * as Location from 'expo-location';
import socket from '../shared/socket';
import { differenceInYears, parse } from 'date-fns';

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

let outsideSwipe:any = '';
export default function Dashboard({ navigation }: any) {
  const { userList, reload } = useSelector((state: any) => state.match);
  const { _id, socket_id, images, swipe_count, subscription } = useSelector((state: any) => state.onboarding);
  const [matchFound, setMatchFound] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<User>({});
  const [swipedImage, setSwipedImage] = useState<string>('');
  const [item, setItem] = useState<User>({})
  const [indexValue, setIndexValue] = useState<number>(0);
  const dispatch: any = useDispatch()
  const [userLocation, setUserLocation] = useState<any>(null)
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const expireCountActionSheetRef = useRef<ActionSheetRef>(null);
  const [userDailySwipeCount, setUserDailySwipeCount] = useState<number>(0);
  let swipeRef: any = '';
  const [swipe,setSwipe]= useState<any>('');
  
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
     wait(1000).then(() => {
    dispatch((reloadPage()))
    dispatch(getUserList({
      latitude: '37.785834',
      longitude: '-122.406417'
    }))
      setRefreshing(false)
    });
  }, []);

  useEffect(() => {
    if (indexValue === (userList.length - 1)) {
      setVisible(true);
    }
  }, [indexValue])

  useEffect(() => {
    setUserDailySwipeCount(swipe_count);
  }, [swipe_count])



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

   // if (latitude && longitude) {
  dispatch(getUserList({
     latitude: '37.785834',
     longitude: '-122.406417'
   }))
  //  }
  }, [])


  return (
 
    <View style={styles.container}>
      <Modal visible={visible} onDismiss={() => { }} contentContainerStyle={styles.containerStyle}>
        <Avatar.Icon icon="timer-sand-empty" />
          <TextTypo mt={20} color="#5f1489" ta="center" size={20} fontFamily="Averta Bold" title="No More Matches"/>
        </Modal>
      {matchFound ?
        <SafeAreaView style={styles.swipeMatchContainer}>
            <View style={styles.imageSwipeContainer}>
              <Image defaultSource={{ uri: PLACEHOLDER_IMAGE }} style={[styles.imageSwipe, {left: -50}]} source={{uri: (URL + '' + images[0]?.image) || EMPTY_URL}} />
              <Image style={styles.matchIcon} source={require('../assets/icons/match-icon.png')} />
              <Image style={styles.matchIcons} source={require('../assets/icons/match-icons.png')}/>
            <Image defaultSource={{ uri: PLACEHOLDER_IMAGE }} style={[styles.imageSwipe, { left: 10 }]} source={{
              uri: (URL + '' + swipedImage) || EMPTY_URL
            }} />
            </View>

          <TextTypo fw="bold" mt={80} color="#ffffff" size={18} title="Matched!" />
            <View style={{width: 177, margin: 'auto'}}>
            <TextTypo mt={70} mb={40} ta="center" color="#ffffff" title="You can now send a message to this person" />
            <Button mode="elevated" onPress={() => {
               dispatch(getUserList({
                latitude: '37.785834',
                longitude: '-122.406417'
              }))
                        dispatch(dispatchUserDetailToChat(item))
                        navigation.navigate('chat', {
                            chats: [],
                            data: item
                        })
                    }}>Send Message</Button>
            <Button onPress={() => {
               dispatch(getUserList({
                latitude: '37.785834',
                longitude: '-122.406417'
              }))
              setMatchFound(false)
            }} style={{ marginTop: 30 }} labelStyle={{ color: '#ffffff' }}>Close</Button>
          </View>
        </SafeAreaView> :
        (userList.length ? 
          <ScrollView refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }>
            <SafeAreaView>
            <View style={styles.logo}>
            <Image style={{height: '100%', width: '100%'}} source={require('../assets/logo_purple.png')}/>
            </View>
            <Swiper
              cards={userList}
              renderCard={(user: User, cardIndex: number) => {
                return (
                  <TouchableWithoutFeedback>
                    {user?.full_name ?
                      <View style={styles.card}>
                        <Image defaultSource={{ uri: PLACEHOLDER_IMAGE }} style={{ height: '100%', width: '100%', borderRadius: 16 }} source={{
                          uri: user?.images?.length ? (URL + '' + user.images[0].image) : EMPTY_URL
                        }} />
                        {user?.full_name ? <View style={{ flexDirection: 'row', width: '50%', position: 'absolute', left: 10, bottom: 200 }}>
                          <View style={{ marginRight: 6 }}><TextTypo fontFamily="Averta Bold" color="#ffffff" title={user?.full_name + ','} size={25} backgroundColor="transparent" /></View>
                          <TextTypo size={25} fontFamily="Averta Bold" color="#ffffff" title={differenceInYears(new Date(), parse(user?.date_of_birth || '', "dd-MM-yyyy", new Date()))} />
                        </View> : <></>}
  
                        {user?.full_name && <View style={styles.swipeContainer}>
                          <TouchableOpacity style={styles.swipeButton} onPress={() => {
                            if (swipe) {
                              swipe.swipeLeft();
                            } else if (outsideSwipe) {
                              outsideSwipe.swipeLeft();
                            } else {
                              swipeRef.swipeLeft();
                            }
                          }}>
                            <Image source={require('../assets/icons/notlike.png')} />
                          </TouchableOpacity>
                        
                          <TouchableWithoutFeedback onPress={() => {
                            setUserInfo(user)
                            actionSheetRef.current?.show()
                          }}>
                            <Avatar.Icon size={60} style={{ backgroundColor: 'rgba(255, 255, 255, 0.73)' }} icon="information-outline" />
                          </TouchableWithoutFeedback>
                        
                          <TouchableOpacity style={styles.swipeButton} onPress={() => {
                            if (swipe) {
                              swipe.swipeRight();
                            } else if (outsideSwipe) {
                              outsideSwipe.swipeRight();
                            } else {
                              swipeRef.swipeRight();
                            }
                         
                          }}>
                            <Image source={require('../assets/icons/like.png')} />
                          </TouchableOpacity>
                        </View>}
                      </View> : <></>}
                  </TouchableWithoutFeedback>
                )
              }}
            
              onSwipedRight={(index) => {
                
                if (userDailySwipeCount <= 0) {
                  outsideSwipe.swipeBack()
                  expireCountActionSheetRef.current?.show()
                } else {
                  setSwipedImage(userList[index].images[0].image)
                setItem(userList[index])
                socket.emit('swipe', {
                  senderId: _id,
                  receiverId: userList[index]._id,
                  type: 'like',
                  socket_id: socket_id,
                  swipe_count: userDailySwipeCount,
                })
                }
                setUserDailySwipeCount(userDailySwipeCount - 1)
              }}
                onSwiped={(index) => {
                setIndexValue(index)
              }}
              // cardStyle={{ borderRadius: 16 }}
              cardHorizontalMargin={0}
              cardVerticalMargin={0}
              showSecondCard={true}
              cardIndex={0}
              stackSize={5}
              verticalSwipe={false}
              backgroundColor={'transparent'}
              // stackSize={1}
                ref={(swiper) => {
                  outsideSwipe= swiper
                  setSwipe(swiper)
                  swipeRef = swiper;
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
           </SafeAreaView>
  
            
          </ScrollView> :
          <SafeAreaView style={{flex: 1, backgroundColor: '#5f1489', justifyContent: 'center', alignItems: 'center'}}>
            <Image resizeMode='contain' style={{width: 80, height: 80}} source={require('../assets/icons/logo.png')}/>
          </SafeAreaView>)
      }
      <ActionSheet ref={actionSheetRef} containerStyle={{ height: '60%', backgroundColor: '#ffffff', paddingVertical: 20 }}>
        {userInfo && 
          <FlatList
          data={[1]}
          keyExtractor={(item, index) => index.toString()}  
          renderItem={({ item }) => (
            <View>
          
        <View style={{ height: '7%'}}>
                <View style={{ flexDirection: 'row', width: '50%', paddingLeft: 20 }}>
                        <View style={{marginRight: 6}}><TextTypo fontFamily="Averta Bold" color="#000000" title={userInfo?.full_name + ','} size={25} backgroundColor="transparent" /></View>
                        <TextTypo size={25} fontFamily="Averta Bold" color="#000000" title={differenceInYears(new Date(), parse(userInfo?.date_of_birth || '', "dd-MM-yyyy", new Date()))}/>
                 </View>
        </View>
          
        <View style={styles.actionsheet}>
                
              <TextTypo ml={10} title="Info" />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
                      {userInfo.height && <Chip style={styles.infoStyle}>{userInfo?.height}</Chip>}
                      {userInfo.intention && <Chip style={styles.infoStyle}>{userInfo.intention}</Chip>}
                      {userInfo.workout && <Chip style={styles.infoStyle}>{userInfo.workout}</Chip>}
                      {userInfo.searching_for && <Chip style={styles.infoStyle}>{userInfo.searching_for}</Chip>}
                      {userInfo.education && <Chip style={styles.infoStyle}>{userInfo.education}</Chip>}
                      {userInfo.religion && <Chip style={styles.infoStyle}>{userInfo.religion}</Chip>}
                    {userInfo.drinking && <Chip style={styles.infoStyle}>{userInfo.drinking}</Chip>}
                      {userInfo.smoking && <Chip style={styles.infoStyle}>{userInfo.smoking}</Chip>}
                  </View>
          
                  <TextTypo mt={15} ml={10} title="Interests" />
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {userInfo.interests?.map((interest, index) => (
                      <Chip key={index} compact style={{margin: 4}}>
                      <TextTypo title={ interest} />
                      </Chip>
                  ))}
           
                </View>
          
                    <TextTypo mt={15} ml={10} title="Sports" />
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                  {userInfo.sports?.map((sport, index) => (
                      <Chip key={index} compact style={{margin: 4}}>
                      <TextTypo title={ sport} />
                      </Chip>
                  ))}
           
                </View>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical:  20}}>
                  {userInfo.images && userInfo.images.map((image, index) => {
                    if (index > 0) {
                       return <Image key={index} style={styles.imageInfo} source={{ uri: URL + '' + image.image }} />
                     }
                  })}
            </View>

          </View>          
            </View>
        )}  
        />
       }
      </ActionSheet>
      
      <ActionSheet ref={expireCountActionSheetRef} containerStyle={{ height: '30%', backgroundColor: '#ffffff', paddingVertical: 20 }}>
        <View style={{ paddingHorizontal: 30 }}>
          <Avatar.Icon color="#5f1489" icon="heart-broken" style={{backgroundColor: 'transparent', alignSelf: 'center'}} />
          <TextTypo fontFamily="Averta Bold" size={20} ta="center" title="You're all out of likes!" />
          <TextTypo mv={20} ta="center" title="Upgrade your plan now to get more likes" />
          <Button labelStyle={{ fontFamily: 'Averta'}} style={{borderRadius: 8, backgroundColor: '#5f1489'}} mode="contained">Upgrade your Plan Now</Button>
        </View>
      </ActionSheet>
    </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 10
  },
  card: {
    flex: 1,
    borderRadius: 16,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "none",
    position: 'relative'
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "transparent",
     fontFamily: 'Averta Bold',
    color: '#ffffff',
  },
  actionsheet: {
    padding: 20,
    backgroundColor: '#ffffff',
    height: '90%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20
},
  swipeContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 100,
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
  logo: {
    width: 140,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.73)',
    position: 'relative',
    zIndex: 999999,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 5
  },
  infoStyle: {
    margin: 10
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
    zIndex: 999,
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
  },
  imageInfo: {
    height: 200,
    width: 150,
    margin: 5,
    borderRadius: 10
  },
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    zIndex: 999999,
    height: '115%',
    alignItems: 'center',
  }
  });
