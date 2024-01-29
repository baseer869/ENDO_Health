import React from 'react';
import {colors} from 'assets/colors';
import {StyleSheet} from 'react-native';
import {LineChart} from 'react-native-wagmi-charts';

const GlucoseTooltip = () => {
  return <LineChart.Tooltip at={4} style={styles.tooltip} />;
};

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: colors.ALPHA_BLACK_40,
  },
});

export default GlucoseTooltip;
