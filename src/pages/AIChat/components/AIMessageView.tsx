import {colors} from 'assets/colors';
import icons from 'components/icons';
import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {formatTimestamp} from 'utils/strings';
import TypeWriterEffect from 'react-native-typewriter-effect';
import LoadingData from './LoadingData';

type AIMessageProps = {
  text?: string;
  loading: boolean;
  createdAt: string;
  onTypingEnd?: () => void;
};

const AIMessageView = ({
  text,
  loading,
  createdAt,
  onTypingEnd,
}: AIMessageProps) => {
  const formattedDate = formatTimestamp(createdAt);
  return (
    <View style={styles.container}>
      <Image source={icons.AIChat} style={{width: 40, height: 40}} />
      <View style={[styles.aiMessageContainer, text ? {width: 204} : {}]}>
        <Text style={styles.aiMessageText}>
          {text ? (
            loading ? (
              <TypeWriterEffect
                content={text}
                minDelay={5}
                maxDelay={20}
                onTypingEnd={onTypingEnd}
              />
            ) : (
              text
            )
          ) : (
            LoadingData()
          )}
        </Text>
      </View>
      <Text style={styles.sentTime}>{formattedDate}</Text>
    </View>
  );
};

export default React.memo(AIMessageView);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  aiMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: colors.GRAY_0,
    marginBottom: 8,
    columnGap: 4,
    marginVertical: 4,
    borderRadius: 20,
    paddingTop: 8.5,
    paddingRight: 17,
    paddingBottom: 8.5,
    paddingLeft: 16,
    marginLeft: 8,
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
  sentTime: {
    alignSelf: 'flex-end',
    color: colors.GRAY_50,
    fontSize: 12,
    paddingBottom: 12,
    paddingLeft: 6,
  },
});
