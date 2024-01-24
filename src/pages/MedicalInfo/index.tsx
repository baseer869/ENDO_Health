import {colors} from 'assets/colors';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Button, Platform} from 'react-native';
import {} from 'react-native-svg';
import MedicalInfoHeader from './components/MedicalInfoHeader';
import CancelTextInput from 'components/common/CancelTextInput';
import Label from 'components/common/Label';
import {Text} from 'components/common';
import ButtonSwitch from './components/ButtonSwitch';
import CircleButton from 'components/common/CircleArrowButton';

import BottomModal from 'components/common/BottomModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import CheckboxListItem from 'components/common/CheckboxListItem';

export default function MedicalInfo() {
  const [weight, setWeight] = useState<string>();
  const [weightUnit, setWeightUnit] = useState<string>('lb');
  const [height, setHeight] = useState<string>();
  const [heightUnit, setHeightUnit] = useState<string>('in');

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const onChangeWeight = (text: string) => {
    setWeight(text);
  };

  const onChangeHeight = (text: string) => {
    setHeight(text);
  };

  const handleSheetOpen = () => {
    bottomSheetRef.current?.present();
  };

  const handleSheetCloseReset = () => {
    bottomSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <MedicalInfoHeader currentIndex={0} />
      <View style={styles.mainPadding}>
        <Text style={styles.title}>
          Tell us about you to make this app yours
        </Text>
        <View style={styles.textInputContainer}>
          <Label text="Weight" />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 20}}>
              <CancelTextInput
                placeholder="Enter weight"
                value={weight}
                onChangeText={onChangeWeight}
                placeholderTextColor={colors.GRAY_30}
              />
            </View>
            <ButtonSwitch
              value={weightUnit}
              values={['lb', 'kg']}
              onChange={t => setWeightUnit(t)}
            />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <Label text="Height" />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1, marginRight: 20}}>
              <CancelTextInput
                placeholder="Enter height"
                value={height}
                onChangeText={onChangeHeight}
                placeholderTextColor={colors.GRAY_30}
              />
            </View>
            <ButtonSwitch
              value={heightUnit}
              values={['in', 'cm']}
              onChange={t => setHeightUnit(t)}
            />
          </View>
        </View>
        <View style={styles.textInputContainer}>
          <Label text="Ethnicity" />
          <CancelTextInput />
        </View>
      </View>

      <BottomModal
        isHandleComponent
        onDismiss={handleSheetCloseReset}
        snapPoints={[Platform.OS === 'ios' ? '38%' : '42%']}
        ref={bottomSheetRef}>
        <View style={{flex: 1}}>
          <CheckboxListItem title={'d.text'} isSelected={true} />
          <CheckboxListItem title={'d.text'} />
        </View>
      </BottomModal>

      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 28,
        }}>
        <CircleButton disabled={false} onPress={handleSheetOpen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: '700',
    fontSize: 28,
    color: colors.GRAY_100,
    marginTop: 20,
    marginBottom: 60,
  },
  textInputContainer: {
    marginBottom: 40,
  },
  mainPadding: {
    flex: 1,
    paddingHorizontal: 30,
  },

  rectangle535: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(0, 87, 255, 1)',
  },
});
