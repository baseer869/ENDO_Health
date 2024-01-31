import { colors } from 'assets/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type InsightCardProps = {
  title: string;
  description: string;
};

export const InsightCard = ({title, description}: InsightCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{alignItems:'flex-start', rowGap:8}}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer:{
    backgroundColor:colors.GRAY_5,
    width:194,
    height:97,
    alignItems:'flex-start',
    paddingHorizontal:16,
    paddingVertical:18,
    borderRadius:8,
    marginRight:12,
  },
  title:{
   fontSize: 16,
   color: colors.GRAY_80,
   fontStyle:'normal',
   fontWeight:'700',
   lineHeight:19.2,
  },
  description:{
    fontSize: 14,
    color: colors.GRAY_50,
    fontStyle:'normal',
    fontWeight:'400',
    lineHeight:16.8
  }
})