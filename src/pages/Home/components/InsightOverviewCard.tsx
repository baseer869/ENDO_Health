import {InsightCardGraph} from 'apis/userApi';
import {colors} from 'assets/colors';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

export type InsightOverviewCardProps = {
  title: string;
  description: string;
  graph?: InsightCardGraph & {color?: string};
  index: Number;
  length: Number;
};

export const InsightOverviewCard = ({
  title,
  description,
  graph,
  index,
  length,
}: InsightOverviewCardProps) => {
  return (
    <View style={styles.InsightOverviewCardContainer}>
      {graph && (
        <ProgressCircle
          style={{height: 37, width: 38}}
          progress={0.8}
          progressColor={graph?.color || colors.PRIMARY_BLUE}
        />
      )}
      <View style={styles.inSightDetail}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      {(index as number) !== (length as number) - 1 && (
        <View style={styles.separator} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  InsightOverviewCardContainer: {
    flexDirection: 'row',
    columnGap: 15,
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  inSightDetail: {
    alignItems: 'center',
    rowGap: 4,
  },
  separator: {
    height: 30,
    width: 1,
    backgroundColor: colors.GRAY_30,
    alignSelf: 'center',
    marginRight: 14,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 14,
    fontStyle: 'normal',
    lineHeight: 16.8,
    fontWeight: '400',
    color: colors.GRAY_50,
  },
  description: {
    fontSize: 18,
    fontStyle: 'normal',
    lineHeight: 21.6,
    fontWeight: '700',
    color: colors.GRAY_80,
    textAlign: 'center',
  },
});
