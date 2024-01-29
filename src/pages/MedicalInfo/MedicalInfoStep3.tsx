import {colors} from 'assets/colors';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  ScrollView,
  Alert,
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
import {getMoreInfo, getUserInfo, patchMoreInfo} from 'apis/userApi';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {TouchableOpacity} from 'react-native';
import {setUserInfo} from 'stores/UserInfoStore';
import {useDispatch} from 'react-redux';

const CgmArray = [
  'Abott Freestyle Libre 1/2/3',
  'Dexcom G6/G7',
  'Medtronic Guardian',
];

export default function MedicalInfoStep3() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string>();

  const navigation = useNavigation<RootStackScreenProps>();
  const route = useRoute<RouteProp<RootStackParamList, 'MedicalInfoStep3'>>();
  const {
    ethnicity,
    height,
    weight,
    currentMedication,
    dailyMedicationCount,
    diagnosed,
    familyMemberHistory,
  } = route.params;

  const onPressListItem = (item: string) => {
    setSelectedItem(item);
  };

  const onNextMove = async () => {
    if (selectedItem) {
      await patchMoreInfo({
        ethnicity,
        height,
        weight,
        currentMedication,
        dailyMedicationCount,
        diagnosed,
        familyMemberHistory,
        cgmDevice: selectedItem,
      });
    }
    navigation.push('RecommendSelectPage');
    // const res = await getUserInfo();
    // dispatch(setUserInfo(res));
    // Alert.alert('', JSON.stringify(res, null, 2));
  };
  return (
    <View style={styles.container}>
      <MedicalInfoHeader currentIndex={2} />
      <View style={styles.mainPadding}>
        <Text style={styles.title}>Choose your CGM Device</Text>

        {CgmArray.map(item => {
          const isSelected = selectedItem === item;
          return (
            <RadioListItem
              key={item}
              title={item}
              isSelected={isSelected}
              onPress={() => onPressListItem(item)}
            />
          );
        })}
      </View>

      <View
        style={{
          width: '100%',
          alignItems: 'flex-end',
          paddingBottom: 20,
          paddingHorizontal: 28,
        }}>
        <CircleButton onPress={onNextMove} disabled={!selectedItem} />
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
    paddingHorizontal: 20,
  },
  textInputContainer: {
    marginBottom: 40,
  },
  mainPadding: {
    flex: 1,
    paddingHorizontal: 10,
  },

  rectangle535: {
    height: 3,
    flex: 1,
    backgroundColor: 'rgba(0, 87, 255, 1)',
  },
});
