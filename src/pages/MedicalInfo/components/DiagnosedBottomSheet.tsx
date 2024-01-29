import {colors} from 'assets/colors';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  ScrollView,
} from 'react-native';
import Label from 'components/common/Label';
import {Text} from 'components/common';
import CircleButton from 'components/common/CircleArrowButton';

import BottomModal from 'components/common/BottomModal';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CheckboxListItem from 'components/common/CheckboxListItem';
import SelectButton from 'components/common/SelectButton';
import RadioListItem from 'components/common/RadioListItem';
import RoundButton from 'components/common/RoundButton';

interface Props {
  onPressListItem: (data: string) => void;
  selectedItem: string;
  onNextButton: () => void;
}

const DiagnosedArray = [
  'Type 1 Diabetes',
  'Type 2 Diabetes',
  'Pre-diabetes',
  'Dyslipidemia',
  'Hypertension',
  'Cancer',
  'Other',
];

export default function DiagnosedBottomSheet(props: Props) {
  const {onPressListItem, selectedItem, onNextButton} = props;

  return (
    <View style={{flex: 1}}>
      <BottomSheetScrollView>
        {DiagnosedArray.map(diagnosed => {
          const isSelected = diagnosed === selectedItem;
          return (
            <RadioListItem
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
