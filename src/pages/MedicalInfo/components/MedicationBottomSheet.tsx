import {colors} from 'assets/colors';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import CircleButton from 'components/common/CircleArrowButton';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CheckboxListItem from 'components/common/CheckboxListItem';
import {getMoreInfo} from 'apis/userApi';
import RoundButton from 'components/common/RoundButton';
import {SafeAreaView} from 'components/common';
interface Props {
  onPressListItem: (data: string) => void;
  selectedItem: string[];
  onNextButton: () => void;
  items: string[];
}

export default function MedicationBottomSheet(props: Props) {
  const {onPressListItem, selectedItem, onNextButton, items} = props;

  return (
    <SafeAreaView style={{flex: 1}}>
      <BottomSheetScrollView>
        {items?.map(family => {
          const isSelected = selectedItem.includes(family);

          return (
            <CheckboxListItem
              title={family}
              isSelected={isSelected}
              onPress={() => onPressListItem(family)}
            />
          );
        })}
      </BottomSheetScrollView>
      <View style={{marginHorizontal: 20, marginBottom: 30}}>
        <RoundButton text="Done" onPress={onNextButton} isRightArrow={false} />
      </View>
    </SafeAreaView>
  );
}
