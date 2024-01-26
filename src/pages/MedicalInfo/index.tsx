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
import {} from 'react-native-svg';
import MedicalInfoHeader from './components/MedicalInfoHeader';
import CancelTextInput from 'components/common/CancelTextInput';
import Label from 'components/common/Label';
import {Text} from 'components/common';
import ButtonSwitch from './components/ButtonSwitch';
import CircleButton from 'components/common/CircleArrowButton';

import BottomModal from 'components/common/BottomModal';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import CheckboxListItem from 'components/common/CheckboxListItem';
import SelectButton from 'components/common/SelectButton';
import {useNavigation} from '@react-navigation/native';
import {RootStackScreenProps} from 'navigation/rootNavigation';

const EthnicityArray = [
  'White/Caucasian',
  'Black',
  'Asian',
  'Indigenous/Polynesian',
  'Hispanic',
  'Other',
];

export default function MedicalInfo() {
  const navigation = useNavigation<RootStackScreenProps>();
  const [weight, setWeight] = useState<string>();
  const [weightUnit, setWeightUnit] = useState<string>('lb');
  const [height, setHeight] = useState<string>();
  const [heightUnit, setHeightUnit] = useState<string>('in');

  const [selectedEthnicity, setSelectedEthnicity] = useState<string[]>([]);

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

  const onPressListItem = (ethnicity: string) => {
    const temp = [...selectedEthnicity];
    const findIndex = temp?.findIndex(d => ethnicity === d);
    if (findIndex === -1) {
      temp.push(ethnicity);
    } else {
      temp.splice(findIndex, 1);
    }
    setSelectedEthnicity(temp);
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
                keyboardType="number-pad"
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
                keyboardType="number-pad"
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
          <SelectButton
            placeholder={'Choose yours'}
            text={selectedEthnicity.join(', ')}
            onPress={handleSheetOpen}
          />
        </View>
      </View>

      <BottomModal
        isHandleComponent
        onDismiss={handleSheetCloseReset}
        snapPoints={[Platform.OS === 'ios' ? '38%' : '42%']}
        ref={bottomSheetRef}>
        <View style={{flex: 1}}>
          <BottomSheetScrollView>
            {EthnicityArray.map(ethnicity => {
              const isSelected = selectedEthnicity.includes(ethnicity);
              return (
                <CheckboxListItem
                  title={ethnicity}
                  isSelected={isSelected}
                  onPress={() => onPressListItem(ethnicity)}
                />
              );
            })}
          </BottomSheetScrollView>
        </View>
      </BottomModal>

      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 28,
        }}>
        <CircleButton
          disabled={!(weight && height && selectedEthnicity.length > 0)}
          onPress={() => {
            if (selectedEthnicity.length > 0) {
              navigation.push('MedicalInfoStep2', {
                height: height + heightUnit,
                weight: weight + weightUnit,
                ethnicity: selectedEthnicity,
              });
            }
          }}
        />
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
