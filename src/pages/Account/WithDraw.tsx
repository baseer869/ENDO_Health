import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {userWithDraw} from 'apis/userApi';
import {colors} from 'assets/colors';
import {Caution} from 'assets/svgIcons';
import {Text} from 'components/common';
import BackHeader from 'components/common/BackHeader';
import BottomModal from 'components/common/BottomModal';
import CancelTextInput from 'components/common/CancelTextInput';
import Checkbox from 'components/common/Checkbox';
import CheckboxListItem from 'components/common/CheckboxListItem';
import RoundButton from 'components/common/RoundButton';
import {RootStackScreenProps} from 'navigation/rootNavigation';
import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import {useDispatch} from 'react-redux';
import tokenStorage from 'storages/tokenStorage';
import {clearUserInfo} from 'stores/UserInfoStore';

const items = [
  'I rarely use the app',
  'the app is not very helfpul',
  'Privacy concern/data issues',
  'Too many notifications',
  'I will use a different app',
  'Other reason (I will write)',
];

export default function WithDraw() {
  const [isCheck, setIsCheck] = useState(false);
  const [reason, setReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const navigation = useNavigation<RootStackScreenProps>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const handleSheetCloseReset = () => {
    bottomSheetRef.current?.close();
  };
  const isOtherReason = reason === 'Other reason (I will write)';

  const snapPoint = reason === 'Other reason (I will write)' ? '60%' : '50%';
  const dispatch = useDispatch();

  const onWithDraw = async (reason: string) => {
    if (isOtherReason) {
      await userWithDraw({reason: otherReason});
    } else {
      await userWithDraw({reason});
    }
    tokenStorage.set('');
    // dispatch(clearUserInfo());
    navigation.push('WithDrawResult');
    bottomSheetRef.current?.close();
  };
  return (
    <View style={styles.container}>
      <BackHeader />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginHorizontal: 30,
        }}>
        <View style={styles.caution}>
          <Caution />
          <Text style={styles.text}>We are about to delete your account</Text>
        </View>
        <View style={{marginBottom: 50}}>
          <Text
            style={{color: colors.GRAY_60, fontSize: 16, fontWeight: '700'}}>
            Before you go:
          </Text>
          <Text style={{color: colors.GRAY_60, fontSize: 15}}>
            ·Your account data and chat history will be removed within days.
          </Text>
          <Text
            style={{
              color: colors.PRIMARY_RED,
              fontSize: 15,
            }}>
            ·This is final. You will not be able to recover your health or chat
            related data in any way.
          </Text>
          <View style={{}}>
            <TouchableOpacity
              onPress={() => setIsCheck(!isCheck)}
              style={{
                flexDirection: 'row',
                marginTop: 30,
                alignItems: 'center',
              }}>
              <Checkbox isSelected={isCheck} />

              <Text
                style={{
                  marginLeft: 14,
                  color: colors.GRAY_80,
                  fontSize: 16,
                  fontWeight: '700',
                }}>
                I understand that all my data will be deleted permanently
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', marginTop: 33}}>
            <View style={{flex: 1, marginRight: 5}}>
              <RoundButton
                containerStyle={{backgroundColor: colors.GRAY_5}}
                text="Back"
                isRightArrow={false}
                onPress={() => navigation.goBack()}
                textStyle={{color: colors.GRAY_100}}
              />
            </View>
            <View style={{flex: 2}}>
              <RoundButton
                containerStyle={{backgroundColor: colors.PRIMARY_RED}}
                text="Delete account"
                isRightArrow={false}
                onPress={() => {
                  if (isCheck) bottomSheetRef.current?.present();
                }}
              />
            </View>
          </View>
        </View>
      </View>
      <BottomModal
        isHandleComponent
        onDismiss={handleSheetCloseReset}
        snapPoints={[snapPoint]}
        ref={bottomSheetRef}>
        <View style={{flex: 1}}>
          <BottomSheetScrollView>
            {items?.map(res => {
              const isSelected = reason === res;

              const isOtherReason =
                reason === 'Other reason (I will write)' &&
                res === 'Other reason (I will write)';

              return (
                <>
                  <CheckboxListItem
                    title={res}
                    isSelected={isSelected}
                    onPress={() => setReason(res)}
                  />
                  {isOtherReason && (
                    <View style={{marginHorizontal: 20, paddingVertical: 10}}>
                      <CancelTextInput
                        placeholder="Please share why"
                        onChangeText={setOtherReason}
                      />
                    </View>
                  )}
                </>
              );
            })}
          </BottomSheetScrollView>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <View style={{flex: 1, marginRight: 5}}>
              <RoundButton
                containerStyle={{backgroundColor: colors.GRAY_5}}
                text="Skip"
                isRightArrow={false}
                onPress={() => onWithDraw('')}
                textStyle={{color: colors.GRAY_100}}
              />
            </View>
            <View style={{flex: 2}}>
              <RoundButton
                containerStyle={{backgroundColor: colors.PRIMARY_RED}}
                text="Delete account"
                isRightArrow={false}
                onPress={() => onWithDraw(reason)}
              />
            </View>
          </View>
        </View>
      </BottomModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  caution: {alignItems: 'center', marginTop: 40, marginBottom: 20},
  text: {
    fontWeight: '700',
    color: colors.GRAY_100,
    fontSize: 22,
    textAlign: 'center',
  },
  union: {
    position: 'absolute',
    flexShrink: 0,
    top: 65,
    left: 66,
    width: 9,
    height: 35,
    overflow: 'visible',
  },
});
