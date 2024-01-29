import React from 'react';
import {LineChart} from 'react-native-wagmi-charts';
import {StyleSheet} from 'react-native';
import GlucoseCrossHair from './GlucoseCrossHair';
import {colors} from 'assets/colors';

const NONE_LINE_COLOR = 'rgba(255,255,255, 1.0)';
const DEFAULT_LINE_COLOR = colors.PRIMARY_BLUE;
const WARN_LINE_COLOR = colors.PRIMARY_RED;

const GlucoseLineChart = () => {
  const data = [
    {timestamp: 1706274000000, value: 118.73},
    {timestamp: 1706274900000, value: 96.68},
    {timestamp: 1706275800000, value: 123.81},
    {timestamp: 1706276700000, value: 115.46},
    {timestamp: 1706277600000, value: 109.31},
    {timestamp: 1706278500000, value: 135.13},
    {timestamp: 1706279400000, value: 139.58},
    {timestamp: 1706280300000, value: 118.69},
    {timestamp: 1706281200000, value: 129.51},
    {timestamp: 1706282100000, value: 123.94},
    {timestamp: 1706283000000, value: 98.76},
    {timestamp: 1706283900000, value: 76.13},
    {timestamp: 1706284800000, value: 88.42},
    {timestamp: 1706285700000, value: 102.1},
    {timestamp: 1706286600000, value: 88.02},
    {timestamp: 1706287500000, value: 80.9},
    {timestamp: 1706288400000, value: 81.11},
    {timestamp: 1706289300000, value: 79.59},
    {timestamp: 1706290200000, value: 79.53},
    {timestamp: 1706291100000, value: 100.44},
    {timestamp: 1706292000000, value: 120.48},
    {timestamp: 1706292900000, value: 139.12},
    {timestamp: 1706293800000, value: 151.9},
    {timestamp: 1706294700000, value: 176.73},
    {timestamp: 1706295600000, value: 147.67},
    {timestamp: 1706296500000, value: 167.56},
    {timestamp: 1706297400000, value: 166.32},
    {timestamp: 1706298300000, value: 143.26},
    {timestamp: 1706299200000, value: 127.82},
    {timestamp: 1706300100000, value: 145.91},
    {timestamp: 1706301000000, value: 158.15},
    {timestamp: 1706301900000, value: 132.53},
    {timestamp: 1706302800000, value: 130.68},
  ];
  const maxValue = Math.max(...data.map(item => item.value)) + 20;
  const maxDate = Math.max(...data.map(item => item.timestamp));

  const now = Date.now();
  const before11Hours = maxDate - 11 * 60 * 60 * 1000;

  const highValueIndexes = data
    .map((item, index) => (item.value > 160 ? index : -1))
    .filter(index => index !== -1);
  const lineWidth = 4;

  return (
    <LineChart.Provider data={data} yRange={{min: 40, max: maxValue}}>
      <LineChart style={styles.chart} height={240}>
        <LineChart.Path color={DEFAULT_LINE_COLOR} width={lineWidth}>
          {highValueIndexes.map(index => (
            <LineChart.Highlight
              key={index}
              color={WARN_LINE_COLOR}
              width={lineWidth}
              from={index === 0 ? 0 : index - 1}
              to={index + 1}
            />
          ))}
          <LineChart.Highlight
            color={NONE_LINE_COLOR}
            from={11}
            to={14}
            width={lineWidth + 2}
          />
          <LineChart.HorizontalLine at={{value: 70}} color={colors.GRAY_20} />
          <LineChart.HorizontalLine at={{value: 160}} color={colors.GRAY_20} />
        </LineChart.Path>
        <LineChart.CursorLine color={colors.PRIMARY_BLUE} />
        <GlucoseCrossHair />
      </LineChart>
    </LineChart.Provider>
  );
};

const styles = StyleSheet.create({
  chart: {
    backgroundColor: '#FFFFFF',
  },
});

export default GlucoseLineChart;
