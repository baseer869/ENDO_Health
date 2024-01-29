import {InsightCardGraph} from 'apis/userApi';
import {colors} from 'assets/colors';
import React from 'react';
import {Text, View} from 'react-native';
import {ProgressCircle} from 'react-native-svg-charts';

export type InsightOverviewCardProps = {
  title: string;
  description: string;
  graph?: InsightCardGraph & {color?: string};
};

export const InsightOverviewCard = ({
  title,
  description,
  graph,
}: InsightOverviewCardProps) => {
  return (
    <View style={{flex: 1}}>
      {graph && (
        <ProgressCircle
          style={{height: 36, marginTop: 30}}
          progress={0.8}
          progressColor={graph?.color || colors.PRIMARY_BLUE}
        />
      )}
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
};
