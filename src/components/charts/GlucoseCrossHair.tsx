import React from 'react';
import {colors} from 'assets/colors';
import {LineChart} from 'react-native-wagmi-charts';
import {StyleSheet} from 'react-native';

export const GLUCOSE_NONE_DATA = 10.12;

const GlucoseCrossHair = () => {
  return (
    <LineChart.CursorCrosshair
      size={16}
      crosshairProps={{
        style: {
          borderColor: colors.BLUE_60,
          borderWidth: 3,
          backgroundColor: 'rgba(255,255,255,1)',
        },
      }}>
      <LineChart.Tooltip>
        <LineChart.PriceText
          style={styles.tooltip}
          format={({value}) => {
            'worklet';
            if (parseFloat(value) === GLUCOSE_NONE_DATA) {
              return 'No Data';
            }
            const formattedPrice = Math.floor(parseInt(value, 10));
            return `${formattedPrice}mg/dL`;
          }}
        />
      </LineChart.Tooltip>
      <LineChart.Tooltip position="bottom" cursorGutter={1000} yGutter={0}>
        <LineChart.DatetimeText
          style={styles.bottomTooltip}
          locale="en-US"
          options={{
            hour: 'numeric',
            minute: 'numeric',
          }}
        />
      </LineChart.Tooltip>
    </LineChart.CursorCrosshair>
  );
};

const styles = StyleSheet.create({
  tooltip: {
    fontSize: 15,
    backgroundColor: colors.BLUE_10,
    borderColor: colors.PRIMARY_BLUE,
    borderWidth: 1,
    borderRadius: 5,
    color: colors.PRIMARY_BLUE,
    paddingHorizontal: 7,
    paddingVertical: 0,
  },
  bottomTooltip: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16.8,
    color: colors.PRIMARY_BLUE,
    textAlign: 'center',
  },
});

export default GlucoseCrossHair;
