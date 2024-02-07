import { colors } from 'assets/colors';
import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { formatTimestamp } from 'utils/strings';

const { width: screenWidth } = Dimensions.get('window');

const UserMessageView: React.FC = ({ text, createdAt }) => {
  const formattedDate = formatTimestamp(createdAt);

  return (
    <View style={styles.container}>
      <Text style={styles.sentTime}>{formattedDate}</Text>
      <View
        style={[
          styles.userMessageContainer,
          { maxWidth: screenWidth * 0.6, }, // Set maxWidth and width properties
        ]}
      >
        <Text style={styles.userMessageText} >
          {text}
        </Text>
      </View>
    </View>
  );
};

export default UserMessageView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  userMessageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 8,
    columnGap: 4,
    marginVertical: 12,
    alignSelf: 'flex-end',
    backgroundColor: colors.PRIMARY_BLUE,
    borderRadius: 20,
    paddingTop: 8.5,
    paddingRight: 17,
    paddingBottom: 8.5,
    paddingLeft: 16,
  },
  userMessageText: {
    color: colors.GRAY_0,
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
    paddingRight: 6,
  },
});
