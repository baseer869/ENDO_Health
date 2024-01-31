import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems:'center',
  },
  column: {
    flexDirection: 'column',
    alignItems:'center'
  },
  rowWithSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  columnWithSpaceBetween: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowWithSpaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  columnWithSpaceAround: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
