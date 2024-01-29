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
import {
  getMoreInfo,
  getUserInfo,
  getUserReferral,
  patchMoreInfo,
} from 'apis/userApi';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  RootStackParamList,
  RootStackScreenProps,
} from 'navigation/rootNavigation';
import {TouchableOpacity} from 'react-native';
import {setUserInfo} from 'stores/UserInfoStore';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from './components/LoadingModal';
import {RootState} from 'reducers';

const RecommendArray = [
  {text: 'Got here on my own', subText: ''},
  {text: 'A friend recommended me', subText: ''},
  {text: 'Saw on social channels', subText: 'Instagram, Facebook, etc.'},
  {text: 'Saw an advertisement', subText: ''},
  {text: 'Searched online', subText: 'Google search etc.'},
  {text: 'Found on App marketplace', subText: 'iOS Appstore, Google Playstore'},
  {text: 'Other', subText: 'Please tell us'},
];

export default function RecommendSelectPage() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');
  const userInfo = useSelector((state: RootState) => state.userInfoStore);

  const navigation = useNavigation<RootStackScreenProps>();

  const onPressListItem = (item: string) => {
    setSelectedItem(item);
  };

  const onNextMove = async () => {
    if (selectedItem) {
      await getUserReferral({referral: selectedItem});
      setIsLoading(true);
      setLoadingText(
        `Now building ${userInfo.userInfo?.username} home screens`,
      );

      setTimeout(() => {
        setLoadingText('It’s all set Let’s begin!');
        setTimeout(async () => {
          const res = await getUserInfo();
          dispatch(setUserInfo(res));
        }, 1000);
      }, 2000);

      //   const res = await getUserInfo();
      //   dispatch(setUserInfo(res));
    }
  };

  return (
    <View style={styles.container}>
      <MedicalInfoHeader currentIndex={2} />
      <View style={styles.mainPadding}>
        <Text style={styles.title}>How did you get to know us?</Text>

        {RecommendArray.map(({text, subText}) => {
          const isSelected = selectedItem === text;
          return (
            <RadioListItem
              key={text}
              title={text}
              subText={subText}
              isSelected={isSelected}
              onPress={() => onPressListItem(text)}
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
        <CircleButton onPress={onNextMove} disabled={false} />
      </View>
      <LoadingModal
        visible={isLoading}
        onClose={() => {}}
        name={userInfo.userInfo?.username ?? ''}
        mainText={loadingText}
      />
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
