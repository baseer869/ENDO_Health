import React from 'react';
import {View} from 'react-native';

import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CheckboxListItem from 'components/common/CheckboxListItem';
import RoundButton from 'components/common/RoundButton';
interface Props {
  onPressListItem: (data: string) => void;
  selectedItem: string[];
  onNextButton: () => void;
}

const FamilyMemberHistoryArray = [
  'Mother',
  'Father',
  'Sibiling(s)',
  'Grandmother',
  'Grandfather',
  'Other relatives',
  'None',
];

export default function FamilyBottomSheet(props: Props) {
  const {onPressListItem, selectedItem, onNextButton} = props;

  return (
    <View style={{flex: 1}}>
      <BottomSheetScrollView>
        {FamilyMemberHistoryArray.map(diagnosed => {
          const isSelected = selectedItem.includes(diagnosed);
          return (
            <CheckboxListItem
              key={diagnosed}
              title={diagnosed}
              isSelected={isSelected}
              onPress={() => onPressListItem(diagnosed)}
            />
          );
        })}
      </BottomSheetScrollView>
      <View style={{marginHorizontal: 20, marginBottom: 30}}>
        <RoundButton text="Next" onPress={onNextButton} />
      </View>
    </View>
  );
}
