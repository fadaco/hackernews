import { useState, useEffect, useRef } from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { Avatar } from 'react-native-paper';
import Swiper from 'react-native-deck-swiper';
import TextTypo from '../components/textTypo';


const db = [
  {
    name: 'Richard Hendricks',
    img: require('../assets/icons/testImage.png'),
    location: 'Ikoyi, Lagos 13 Miles from you',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
  },
  {
    name: 'Erlich Bachman',
    img: require('../assets/icons/profile.png'),
    location: 'Ikoyi, Lagos 13 Miles from you',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',

  },
  {
    name: 'Monica Hall',
    img: require('../assets/icons/testImage.png'),
    location: 'Ikoyi, Lagos 13 Miles from you',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
  },
  {
    name: 'Jared Dunn',
    img: require('../assets/icons/profile.png'),
    location: 'Ikoyi, Lagos 13 Miles from you',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',
  },
  {
    name: 'Dinesh Chugtai',
    img: require('../assets/icons/testImage.png'),
    location: 'Ikoyi, Lagos 13 Miles from you',
    about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ',

  }
]


export default function Dashboard() {
  const { stories_ids, top_story, skip, limit } = useSelector((state: any) => state.topstory);
  const dispatch: any = useDispatch()
  let swipe:any = '';
  const characters = db

  return (
   
    <View style={styles.container}>
      <ScrollView>
        <View style={{ position: 'relative', height: 1320}}>
          <Swiper
        cards={characters}
        renderCard={(card) => {
            return (
              <View style={[styles.card, { borderBottomLeftRadius: 16, borderBottomRightRadius: 16}]}>
                <View style={{position: 'relative',}}>
                    <Image style={{ width: '100%',height: '100%', borderTopLeftRadius: 16, borderTopRightRadius: 16}} source={card.img}/>
                  <Text style={[styles.text, { position: 'absolute' }]}>{card.name}</Text>
                  <View style={styles.swipeContainer}>
                    <TouchableOpacity style={styles.swipeButton} onPress={()=> swipe.swipeLeft()}>
                      <Image source={require('../assets/icons/notlike.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.swipeButton} onPress={()=> swipe.swipeRight()}>
                    <Image source={require('../assets/icons/like.png')}/>
                    </TouchableOpacity>
                  </View>
                  </View>
               
                <View style={{backgroundColor: 'rgba(95, 20, 137, 0.1)', paddingHorizontal: 10, paddingBottom: 30, borderBottomLeftRadius: 16, borderBottomRightRadius: 16}}>
                <View style={{ marginVertical: 40 }}>
                  <TextTypo size={15} color="#3D3735" title="About me" />
                  <TextTypo size={18} color="#3D3735" title={card.about} />
                </View>
                <View>
                  <View style={{width: 200, height: 200}}>
                  <Image style={{width: 200, height: 200}} source={card.img}/>

                  </View>
                  <View style={{ marginVertical: 40 }}>
                    <TextTypo size={15} color="#3D3735" title="location" />
                    <TextTypo size={24} color="#3D3735" title={card.location} />
                  </View>
                  
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <TouchableOpacity onPress={()=> swipe.swipeLeft()}>
                      <Avatar.Icon style={{backgroundColor: '#5f1489'}} size={70} icon="close" />
                      </TouchableOpacity>   
                      <TouchableOpacity onPress={()=> swipe.swipeRight()}>
                      <Avatar.Icon style={{backgroundColor: '#5f1489'}} size={70} icon="cards-heart" />
                      </TouchableOpacity>
                  </View>

                </View>
                  </View>
                </View>
            )
        }}
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => { console.log('onSwipedAll') }}
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
                title:  'LIKE',
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
        </ScrollView>
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
  }

  });
