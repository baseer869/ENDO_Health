import {TLineChartPoint} from 'react-native-wagmi-charts';

export const toHexNumber = (decimal: number): number => {
  const hexString = decimal.toString(16);
  return parseInt(hexString, 16);
};

export const addWarningChartPoints = (
  chartPoints: TLineChartPoint[],
  warnMaxLimit: number,
  warnMinLimit: number,
): TLineChartPoint[] => {
  // warn Max, Min Limit을 넘는 구간을 만나면 앞뒤로 chartPoint를 limit에 맞는 값을 추가하고 반환한다.
  const result: TLineChartPoint[] = [];
  const chartPointLength = chartPoints.length;
  let i = 0;

  let maxFlag = false;
  let minFlag = false;

  while (i < chartPointLength) {
    const chartPoint = chartPoints[i++];

    if (!maxFlag && chartPoint.value > warnMaxLimit) {
      maxFlag = true;
      result.push({
        timestamp: chartPoint.timestamp - 1000,
        value: warnMaxLimit,
      });
    }
    if (!minFlag && chartPoint.value < warnMinLimit) {
      minFlag = true;
      result.push({
        timestamp: chartPoint.timestamp - 1000,
        value: warnMinLimit,
      });
    }

    if (maxFlag && chartPoint.value < warnMaxLimit) {
      maxFlag = false;
      result.push({
        timestamp: chartPoint.timestamp - 1000,
        value: warnMaxLimit,
      });
    }
    if (minFlag && chartPoint.value > warnMinLimit) {
      minFlag = false;
      result.push({
        timestamp: chartPoint.timestamp - 1000,
        value: warnMinLimit,
      });
    }

    result.push(chartPoint);
  }

  return result;
};
