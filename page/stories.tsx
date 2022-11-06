import { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import { fetchStoryId, paginate } from '../store/actions/top-stories.actions';
import Story from '../components/story';
import {  Button,IconButton } from 'react-native-paper';


export default function Stories() {
  const { stories_ids, top_story, skip, limit } = useSelector((state: any) => state.topstory);
  const dispatch: any = useDispatch()
  useEffect(() => {
    dispatch(fetchStoryId());
  }, [])
  console.log(stories_ids);
  return (
    <View style={styles.maincontainer}>
      {stories_ids.length ?
        <FlatList data={stories_ids.slice(skip, limit)} keyExtractor={storyId => storyId} renderItem={({ item, index }) => (
          <Story storyId={item} index={index} data={top_story.filter((story: any) => story.id === item)} />
        )} /> : <Text style={styles.text}>Loading...</Text>}
        
      {top_story.length ?
        <View style={styles.button}>
           <IconButton icon='chevron-left' disabled={skip <= 0} onPress={ () => dispatch(paginate('prev'))}/>
           <IconButton icon='chevron-right' disabled={limit >= stories_ids.length} onPress={ () => dispatch(paginate('next'))}/>
      </View> : <Text></Text>}
      </View>
    )
}


const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  button: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent:'center'
  },
  text: {
    textAlign: 'center'
  }
  });