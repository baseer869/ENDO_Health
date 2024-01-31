import { colors } from 'assets/colors';
import icons from 'components/icons';
import React, { useState, useEffect, useRef,  } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet,Image, StatusBar, SafeAreaView } from 'react-native';
import { format } from 'date-fns';
import Header from './Header';
import Onboarding from './OnBoarding';

interface Message {
  text: string;
  fromUser: boolean;
}

const AIChatScreen: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sendButtonStyle, setSendButtonStyle] = useState({ backgroundColor: colors.GRAY_30 });
  const [aiName, setAiName] = useState('Endo'); //from onboarding

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
  
    // Automatically scroll to the end after adding a new user message
    scrollToBottom();
  
    // Simulate AI response after a brief delay
    setTimeout(() => {
      const aiResponse: Message = { text: 'I am Endo, your friendly medical assistant.?', fromUser: false };
      setUserMessages((prevUserMessages) => [...prevUserMessages, aiResponse]);
  
      // Automatically scroll to the end after adding new AI messages
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
  const timestamp = 1640774400000; // Replace this with timestamp in milliseconds
  const formattedDate = format(new Date(timestamp), "EEEE, MMMM do");


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.GRAY_0} barStyle={"dark-content"} />
     <Header aiName={aiName} />
      {/* AI Responses */}
      <FlatList
        ref={(ref) => (flatListRef.current = ref)}
        data={userMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={item.fromUser ? styles.userMessageContainer : styles.aiMessageContainer}>
            {  !item.fromUser && <Image source={icons.AIChat} style={{ width: 40, height: 40}} />}
             <View style={item.fromUser ? styles.userMessage : styles.aiMessage}>
                <Text style={item?.fromUser ? styles.userMessageText: styles.aiMessageText}>{item.text}</Text>
            </View>
            {/* <Text style={item?.fromUser ? styles.sentTimeUser : styles.sentTime}>{'Now'}</Text> */}
          </View>
        )}
        ListHeaderComponent={()=>{
          return(
            <View style={{minHeight:80, bottom:10, alignItems:'center', justifyContent:'center'}}>
               <Text style={styles.date}>{formattedDate}</Text>
            </View>
          )
        }}
        ListFooterComponent={()=> <View style={{  marginVertical:30}} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding:6,}}
      />
      
      {/* ASK AI */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={`Ask ${aiName}`}
          value={inputText}
          onChangeText={handleInputChange}
          placeholderTextColor={colors.GRAY_40}
          cursorColor={colors.PRIMARY_BLUE}
        />
        <TouchableOpacity style={{...styles.sendButton,...sendButtonStyle }} activeOpacity={0.7} onPress={handleSendMessage}>
          <Image source={icons.icon_direction_up_line_30} style={{width: 18, height:18, resizeMode:'contain' }} />
        </TouchableOpacity>
      </View>
      <Onboarding />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_10
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    columnGap:4,
    marginVertical:12,
    width:204,
    alignSelf:'flex-end',
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
    columnGap:4,
    width:204,
    marginVertical:4,
  },
  userMessage: {
    backgroundColor: colors.PRIMARY_BLUE,
    borderRadius: 20,
    paddingTop: 8.5,
    paddingRight: 17,
    paddingBottom: 8.5,
    paddingLeft: 16,
    position: 'relative', // Set position relative for absolute positioning inside
  },
  userMessageText:{
    color: colors.GRAY_0,
    fontSize: 16,
    lineHeight:24,
    // fontFamily: "",
    fontWeight:"400"
  },
  aiMessage: {
    backgroundColor: colors.GRAY_0,
    padding: 8,
    borderTopRightRadius:20,
    borderBottomRightRadius:20,
    borderBottomLeftRadius:20,
    textAlign:'center',
    paddingTop: 8.5,
    paddingRight: 16,
    paddingBottom: 8.5,
    paddingLeft: 17,
  },
  aiMessageText:{
    color: colors.GRAY_100,
    fontSize: 16,
    lineHeight:24,
    // fontFamily: "",
    fontWeight:"400"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:0,
    paddingHorizontal:12,
    height:82
  },
  sentTimeUser: {
    position: 'absolute',
    bottom: 0,
    right: 12,
    color: colors.GRAY_50,
    fontSize: 12,
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
    color: colors.GRAY_100,
    paddingRight:50
  },
  sendButton: {
    height:30,
    width:30,
    backgroundColor: colors.GRAY_30,
    borderRadius: 20,
    position:'absolute',
    right:22,
    justifyContent:'center',
    alignItems:'center',
    padding:6,
  },
  sendButtonText: {
    color: 'white',
  },
  date:{
    fontSize:12,
    lineHeight:14.33,
    color: colors.GRAY_70,
    fontWeight:'400'
  },
  sentTime:{
    fontSize:9,
    lineHeight:11,
    color: colors.GRAY_50,
    fontStyle:'normal',
    // fontFamily:""
    alignSelf:'flex-end',
  }
});

export default AIChatScreen;
