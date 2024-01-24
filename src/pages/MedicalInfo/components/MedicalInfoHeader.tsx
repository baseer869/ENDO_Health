import {colors} from 'assets/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  currentIndex: number;
}

export default function MedicalInfoHeader(props: Props) {
  const {currentIndex} = props;
  return (
    <View style={styles.listItemH54TopNavigation}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        {[1, 1, 1].map((d, idx) => {
          currentIndex;
          return (
            <View
              style={[
                styles.rectangle535,
                {
                  backgroundColor:
                    idx > currentIndex ? colors.GRAY_10 : colors.PRIMARY_BLUE,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemH54TopNavigation: {
    alignItems: 'flex-start',
  },

  rectangle535: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(0, 87, 255, 1)',
  },
});
