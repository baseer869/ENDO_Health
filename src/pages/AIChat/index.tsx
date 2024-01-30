// AIChatScreen.tsx

import { colors } from 'assets/colors';
import icons from 'components/icons';
import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,Image } from 'react-native';

interface Message {
  text: string;
  fromUser: boolean;
}

const AIChatScreen: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sendButtonStyle, setSendButtonStyle] = useState({ backgroundColor: colors.GRAY_30 });

  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    // Initial AI greeting when the component mounts
    const initialAIMessage: Message = { text: 'Hi Chloe 👋🏻', fromUser: false };
    setUserMessages([initialAIMessage]);
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    const newUserMessage: Message = { text: inputText, fromUser: true };
    setUserMessages((prevUserMessages) => [...prevUserMessages, newUserMessage]);

    setInputText('');

    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiResponse: Message = { text: 'How can I assist you today?', fromUser: false };
      setUserMessages((prevUserMessages) => [...prevUserMessages, aiResponse]);
      scrollToBottom();
    }, 1000);
  };
  const handleInputChange = (text: string) => {
    setInputText(text);
    setSendButtonStyle({
      backgroundColor: text ? colors.PRIMARY_BLUE : colors.GRAY_30,
    });
  };

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={userMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.fromUser ? styles.userMessageContainer : styles.aiMessageContainer}>
            <View style={item.fromUser ? styles.userMessage : styles.aiMessage}>
              <Text>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask Endo"
          value={inputText}
          onChangeText={handleInputChange}
          placeholderTextColor={colors.GRAY_40}
          cursorColor={colors.PRIMARY_BLUE}
        />
        <TouchableOpacity style={{...styles.sendButton,...sendButtonStyle }} onPress={handleSendMessage}>
          <Image source={icons.icon_direction_up_line_30} style={{width: 18, height:18, resizeMode:'contain' }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: colors.GRAY_10
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  userMessage: {
    backgroundColor: '#DCF8C5',
    padding: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  aiMessage: {
    backgroundColor: '#E6E6E6',
    padding: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:20,
    paddingHorizontal:20,
  },
  input: {
    flex: 1,
    minHeight:46,
    borderColor:colors.ALPHA_WHITE_40,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: colors.GRAY_0,
    paddingHorizontal:18,
    fontSize:17,
    fontFamily:"",
    lineHeight: 20.4,
    fontWeight:'400',
    color: colors.GRAY_100
  },
  sendButton: {
    height:30,
    width:30,
    backgroundColor: colors.GRAY_30,
    borderRadius: 20,
    position:'absolute',
    right:30,
    justifyContent:'center',
    alignItems:'center',
    padding:6,
  },
  sendButtonText: {
    color: 'white',
  },
});

export default AIChatScreen;
