import { View,StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { fetchStoryById } from '../store/actions/top-stories.actions';
import {  Card, Paragraph, Text } from 'react-native-paper';

export default function Story({ storyId, data, index }: any) {
   const dispatch: any = useDispatch()
  
  useEffect(() => {
      dispatch(fetchStoryById(storyId));
  }, [storyId])

  return (
    <>
      {data.length ?
        <Card style={{ backgroundColor: index % 2 === 0 ? '#6b4fa9' : '#fc3' }}>
          <Card.Content>
            <Paragraph style={[index % 2 === 0 ? styles.paragraphOne : styles.paragraphTwo, { fontWeight: 'bold'}]}>{data && data[0]?.title}</Paragraph>
            <Paragraph style={index % 2 === 0 ? styles.paragraphOne : styles.paragraphTwo}>{`By: ${data && data[0]?.by}`}</Paragraph>
            <Paragraph style={index % 2 === 0 ? styles.paragraphOne : styles.paragraphTwo} >{`Type: ${data && data[0]?.type}`}</Paragraph>
          </Card.Content>
        </Card>
        : 
        <View style={styles.lazyImage} />
      }
      </>
    )
}

const styles = StyleSheet.create({
  paragraphOne: {
    color: '#ffffff'
  },
  paragraphTwo: {
    color: '#000000'
  },
  lazyImage: {
    backgroundColor: '#f2f2f2',
    height: 50,
    width: '100%'
  }
})