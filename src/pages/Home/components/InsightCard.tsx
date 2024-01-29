import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-paper';

export type InsightCardProps = {
  title: string;
  description: string;
};

export const InsightCard = ({title, description}: InsightCardProps) => {
  return (
    <Card>
      <Card.Content>
        <Text>{title}</Text>
        <Text>{description}</Text>
      </Card.Content>
    </Card>
  );
};
