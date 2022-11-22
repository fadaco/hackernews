import { useState, useCallback, useEffect } from 'react'
import SafeAreaView from 'react-native-safe-area-view';
import TextTypo from '../components/textTypo';
import { GiftedChat } from 'react-native-gifted-chat'


export default function Chatcreen() {


    return (
        <SafeAreaView>
            <TextTypo title="chat" />
            <GiftedChat
      messages={[]}
      onSend={() => {}}
      user={{
        _id: 1,
      }}
    />
        </SafeAreaView>
    )
}