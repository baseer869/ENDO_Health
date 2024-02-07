import { colors } from 'assets/colors';
import icons from 'components/icons';
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import { format } from 'date-fns';
import Header from './Header';
import Onboarding from './OnBoarding';
import EventSource, { EventSourceListener } from "react-native-sse";
import { chatHistory } from 'apis/AiMedicalApi';
import { useSelector } from 'react-redux';
import { RootState } from 'reducers';
import UserMessageView from './components/UserMessageView';
import AIMessageView from './components/AIMessageView';
import { api } from 'apis/apiConstants';

interface Message {
  text: string;
  author: string;
  createdAt: string,
  done: boolean,
  updatedAt: string
}

const AIChatScreen: React.FC = () => {
  const [userMessages, setUserMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [sendButtonStyle, setSendButtonStyle] = useState({ backgroundColor: colors.GRAY_30, });
  const [aiName, setAiName] = useState('Endo'); //from onboarding
  const listRef = useRef<FlatList | null>(null);
  const userInfo = useSelector(
    (state: RootState) => state.userInfoStore.userInfo,
  );

  function getAiMsg(text: any) {

    const url = new URL(`https://api.endohealth.co${api.medical.chat}?text=${text}`);
    
    const es = new EventSource(url, {
      method: 'GET',
      headers: {
        Authorization: {
          toString: function () {
            return "Bearer " + userInfo?.accessToken || "";
          },
        },
      },
      pollingInterval: 0,
      debug: false,
    });

    const listener: EventSourceListener = (event) => {

      if (event.type === "message") {
        const message = JSON.parse(event.data) as Message;
        if (!message.done) {
          setUserMessages((prevMessages) => {
            // Create a copy of the previous state
            const newMessages = [...prevMessages];
            // Find the last message in the array
            const lastMessageIndex = newMessages.length - 1;

            if (lastMessageIndex >= 0 && newMessages[lastMessageIndex].author === "assistant") {
              // Concatenate the partial message to the last message's text
              newMessages[lastMessageIndex].text += message.text;
            }
            // Return the new state
            return newMessages;
          });
        }
      } else if (event.type === "error") {
        console.error("Connection error:", event.message);
      } else if (event.type === "exception") {
        console.error("Error:", event.message, event.error);
      }
    };

    es.addEventListener("open", listener);
    es.addEventListener("message", listener);
    es.addEventListener("error", listener);

    return () => {
      es.removeAllEventListeners();
      es.close();
    };
  }

  const gitChatHistory = async () => {
    let payload = {
      afterDate: "12-02-2023",
      accessToken: userInfo?.accessToken || ""
      // accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTcwNzEwNTMyMSwiZXhwIjoxNzE1NzQ1MzIxfQ.NOTe6DK3dmmUkdTL6yv53FaYQBhXQuobhik6C7MtrIk"
    }
    let response = await chatHistory(payload);
    // console.log('response===>', response);
    setUserMessages(response);
    listRef.current?.scrollToEnd();
  }

  useEffect(() => {
    gitChatHistory();
  }, []);

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;
  
    const newUserMessage: Message = {
      text: inputText,
      author: "user",
      done: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  
    const newAssistantMessage: Message = {
      text: "",
      author: "assistant",
      done: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  
    setUserMessages(prevUserMessages => {
      if (Array.isArray(prevUserMessages)) {
        return prevUserMessages.concat(newUserMessage, newAssistantMessage);
      } else {
        return [newUserMessage, newAssistantMessage];
      }
    });
    getAiMsg(inputText);
    setInputText('');
    listRef.current?.scrollToEnd();
  };

  const handleInputChange = (text: string) => {
    setInputText(text);
    setSendButtonStyle({
      backgroundColor: text ? colors.PRIMARY_BLUE : colors.GRAY_30,
    });
  };

  const timestamp = 1640774400000; // Replace this with timestamp in milliseconds
  const formattedDate = format(new Date(timestamp), 'EEEE, MMMM do');
  return (
    <KeyboardAvoidingView
      behavior={'padding'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.GRAY_0} barStyle={'dark-content'} />
        <Header aiName={aiName} />
        {/* AI Responses */}
        <FlatList
          ref={listRef}
          data={userMessages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            return (
              <View>
                {item.author == "user" ?
                  <View style={{ alignSelf: 'flex-end' }}>
                    <UserMessageView
                      {...item}
                    />
                  </View>
                  :
                  <AIMessageView
                    {...item}
                  />
                }
              </View>
            )
          }
          }
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  minHeight: 80,
                  bottom: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={styles.date}>{formattedDate}</Text>
              </View>
            );
          }}
          ListFooterComponent={() => <View style={{ marginVertical: 30 }} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 6 }}
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
          <TouchableOpacity
            style={{ ...styles.sendButton, ...sendButtonStyle }}
            activeOpacity={0.7}
            onPress={handleSendMessage}>
            <Image
              source={icons.icon_direction_up_line_30}
              style={{ width: 18, height: 18, resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </View>
        <Onboarding />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_10,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    columnGap: 4,
    marginVertical: 12,
    width: 204,
    alignSelf: 'flex-end',
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 8,
    columnGap: 4,
    width: 204,
    marginVertical: 4,
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
  userMessageText: {
    color: colors.GRAY_0,
    fontSize: 16,
    lineHeight: 24,
    // fontFamily: "",
    fontWeight: '400',
  },
  aiMessage: {
    backgroundColor: colors.GRAY_0,
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    textAlign: 'center',
    paddingTop: 8.5,
    paddingRight: 16,
    paddingBottom: 8.5,
    paddingLeft: 17,
  },
  aiMessageText: {
    color: colors.GRAY_100,
    fontSize: 16,
    lineHeight: 24,
    // fontFamily: "",
    fontWeight: '400',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 0,
    paddingHorizontal: 12,
    height: 82,
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
    minHeight: 46,
    borderColor: colors.ALPHA_WHITE_40,
    borderWidth: 1,
    borderRadius: 24,
    backgroundColor: colors.GRAY_0,
    paddingHorizontal: 18,
    fontSize: 17,
    fontFamily: '',
    lineHeight: 20.4,
    fontWeight: '400',
    color: colors.GRAY_100,
    paddingRight: 50,
  },
  sendButton: {
    height: 30,
    width: 30,
    backgroundColor: colors.GRAY_30,
    borderRadius: 20,
    position: 'absolute',
    right: 22,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  sendButtonText: {
    color: 'white',
  },
  date: {
    fontSize: 12,
    lineHeight: 14.33,
    color: colors.GRAY_70,
    fontWeight: '400',
  },
  sentTime: {
    fontSize: 9,
    lineHeight: 11,
    color: colors.GRAY_50,
    fontStyle: 'normal',
    // fontFamily:""
    alignSelf: 'flex-end',
  },
});

export default AIChatScreen;