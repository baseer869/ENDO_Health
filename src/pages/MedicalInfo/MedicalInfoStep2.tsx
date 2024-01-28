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
import RadioListItem from 'components/common/RadioListItem';
import DiagnosedBottomSheet from './components/DiagnosedBottomSheet';
import FamilyBottomSheet from './components/FamilyBottomSheet';
import MedicationBottomSheet from './components/MedicationBottomSheet';
import {getMoreInfo} from 'apis/userApi';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {TouchableOpacity} from 'react-native';

const DiagnosedArray = [
  'Type 1 Diabetes',
  'Type 2 Diabetes',
  'Pre-diabetes',
  'Dyslipidemia',
  'Hypertension',
  'Cancer',
  'Other',
];

const FamilyMemberHistoryArray = [
  'Mother',
  'Father',
  'Sibiling(s)',
  'Grandmother',
  'Grandfather',
  'Other relatives',
  'None',
];

export default function MedicalInfoStep2() {
  const [selectedDiagnosed, setSelectedDiagnosed] = useState<string>();
  const [selectedFamilyMemberHistory, setSelectedFamilyMemberHistory] =
    useState<string[]>([]);
  const [selectedMedication, setSelectedMedication] = useState<string[]>([]);
  const [openModalType, setOpenModalType] = useState<
    'diagnosed' | 'family' | 'medication'
  >();
  const [medicationArray, setMedicationArray] = useState<string[]>([]);
  const [dailyMedicationCount, setDailyMedicationCount] = useState(0);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'MedicalInfoStep2'>>();
  const {ethnicity, height, weight} = route.params;

  const handleSheetOpen = (type: 'diagnosed' | 'family' | 'medication') => {
    setOpenModalType(type);
    bottomSheetRef.current?.present();
  };

  const handleSheetCloseReset = () => {
    bottomSheetRef.current?.close();
  };

  const onPressListItemByDiagnosed = (diagnosed: string) => {
    setSelectedDiagnosed(diagnosed);
  };

  const onPressListItemByFamilyMeberHistory = (family: string) => {
    if (family === 'Not sure' || family === 'None') {
      setSelectedFamilyMemberHistory([family]);
      return;
    }
    const hasNotSure =
      selectedFamilyMemberHistory.includes('Not sure') ||
      selectedFamilyMemberHistory.includes('None');
    const temp = hasNotSure ? [] : [...selectedFamilyMemberHistory];
    const findIndex = temp?.findIndex(d => family === d);
    if (findIndex === -1) {
      temp.push(family);
    } else {
      temp.splice(findIndex, 1);
    }
    setSelectedFamilyMemberHistory(temp);
  };

  const onPressListItemByMedication = (medication: string) => {
    if (medication === 'Not sure') {
      setSelectedMedication(['Not sure']);
      return;
    }
    const hasNotSure = selectedMedication.includes('Not sure');
    const temp = hasNotSure ? [] : [...selectedMedication];
    const findIndex = temp?.findIndex(d => medication === d);
    if (findIndex === -1) {
      temp.push(medication);
    } else {
      temp.splice(findIndex, 1);
    }
    setSelectedMedication(temp);
  };

  const onNextMove = () => {
    if (selectedDiagnosed && selectedFamilyMemberHistory)
      navigation.push('MedicalInfoStep3', {
        ethnicity,
        height,
        weight,
        diagnosed: selectedDiagnosed,
        familyMemberHistory: selectedFamilyMemberHistory,
        currentMedication: selectedMedication,
        dailyMedicationCount,
      });
  };

  useEffect(() => {
    (async () => {
      const res = await getMoreInfo();
      setMedicationArray(res.currentMedication);
      console.log('resasd', res);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MedicalInfoHeader currentIndex={1} />
      <View style={styles.mainPadding}>
        <Text style={styles.title}>
          Tell us about you to make this app yours
        </Text>
        <View style={styles.textInputContainer}>
          <Label text="Diagnosed with" />
          <SelectButton
            placeholder={'ex. Type 2 Diabetes'}
            text={selectedDiagnosed}
            onPress={() => handleSheetOpen('diagnosed')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Label text="Family member history" />
          <SelectButton
            placeholder={'Choose one or select other'}
            text={selectedFamilyMemberHistory.join(', ')}
            onPress={() => handleSheetOpen('family')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Label text="Current medication" />
          <SelectButton
            placeholder={'Choose one or select none'}
            text={selectedMedication.join(', ')}
            onPress={() => handleSheetOpen('medication')}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Label text="How often do you medications daily?" />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1.5,
              borderRadius: 6,
              borderColor: colors.GRAY_20,
              height: 38,
              width: Dimensions.get('window').width / 2.5,
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              onPress={() => setDailyMedicationCount(num => num - 1)}>
              <Text
                style={{
                  color: colors.GRAY_50,

                  fontSize: 17,
                }}>
                -
              </Text>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1.4,
                borderLeftWidth: 1.5,
                borderRightWidth: 1.5,
                borderColor: colors.GRAY_20,
                height: '100%',
              }}>
              <Text
                style={{
                  color: colors.GRAY_50,
                  fontWeight: '700',
                  fontSize: 17,
                }}>
                {dailyMedicationCount}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}
              onPress={() => setDailyMedicationCount(num => num + 1)}>
              <Text
                style={{
                  color: colors.GRAY_50,
                  fontWeight: '700',
                  fontSize: 17,
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <BottomModal
        isHandleComponent
        onDismiss={handleSheetCloseReset}
        snapPoints={[Platform.OS === 'ios' ? '38%' : '42%']}
        ref={bottomSheetRef}>
        <View style={{flex: 1}}>
          {openModalType === 'diagnosed' ? (
            <DiagnosedBottomSheet
              onPressListItem={onPressListItemByDiagnosed}
              selectedItem={selectedDiagnosed ?? ''}
              onNextButton={() => {
                setOpenModalType('family');
              }}
            />
          ) : openModalType === 'family' ? (
            <FamilyBottomSheet
              onPressListItem={onPressListItemByFamilyMeberHistory}
              selectedItem={selectedFamilyMemberHistory ?? ''}
              onNextButton={() => {
                setOpenModalType('medication');
              }}
            />
          ) : (
            <MedicationBottomSheet
              items={medicationArray}
              onPressListItem={onPressListItemByMedication}
              selectedItem={selectedMedication ?? []}
              onNextButton={() => bottomSheetRef.current?.close()}
            />
          )}
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
          onPress={onNextMove}
          disabled={
            !(selectedDiagnosed && selectedFamilyMemberHistory.length > 0)
          }
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
