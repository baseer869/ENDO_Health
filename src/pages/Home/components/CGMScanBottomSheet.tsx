import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  ActivityIndicatorBase,
  ActivityIndicator,
} from 'react-native';
import {BottomSheetModal, BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {colors} from 'assets/colors';
import {fonts} from 'assets/fonts';
import icons from 'components/icons';
import {commonStyles} from 'utils/styles/commonStyles';

const deviceHeight = Dimensions.get('window').height;
const bottomSheetHeight = deviceHeight * 0.65; // Adjust the multiplier as needed
const bottomSheetHeightIOS = deviceHeight * 0.78;

interface CGMScanBottomSheetProps {
  bottomSheetModalRef: React.RefObject<BottomSheetModal>;
}

const CGMScanBottomSheet: React.FC<CGMScanBottomSheetProps> = ({
  bottomSheetModalRef,
}) => {
  const [isScan, setScan] = useState(false);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={[
        Platform.OS == 'android' ? bottomSheetHeight : bottomSheetHeightIOS,
        '100%',
      ]}
      backgroundStyle={{backgroundColor: 'white'}}
      index={0}
      handleIndicatorStyle={{backgroundColor: colors.GRAY_20}}
      backdropComponent={renderBackdrop}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore">
      <Text style={styles.title}>Scan</Text>
      <View style={styles.ScanContainer}>
        <Image
          source={icons.image_cgm_graphic}
          style={{width: 210, height: 210, resizeMode: 'contain'}}
        />
        {/* CGM Info */}
        <View style={{paddingTop: 8, rowGap: 8, width: '75%'}}>
          <Text style={styles.info}>Place your phone near CGM</Text>
          <Text style={styles.descriptiveInfo}>
            It will take only seconds to read your glucose level
          </Text>
        </View>
        {/* Add a meal */}
        <TouchableOpacity activeOpacity={0.7} style={styles.addMealButton}>
          <Image
            source={icons.icon_edit_line_30}
            style={{width: 16, height: 16}}
          />
          <Text style={styles.mealButtonLabel}>Add a meal</Text>
        </TouchableOpacity>
        {/* Buttons */}
        <View style={{...commonStyles.row, marginTop: 34, columnGap: 10}}>
          <TouchableOpacity style={styles.cancelButton} activeOpacity={0.7}>
            <Text style={styles.buttonLable}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.scanButton}>
            {isScan ? (
              <ActivityIndicator color={'#fff'} size={'small'} />
            ) : (
              <>
                <Image
                  source={icons.icon_scan2_white_line_30}
                  style={{width: 18, height: 18}}
                />
                <Text style={{...styles.buttonLable, color: colors.GRAY_0}}>
                  Scan
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default CGMScanBottomSheet;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontStyle: 'normal',
    fontFamily: fonts.Pretendard_Bold,
    lineHeight: 28.6,
    color: colors.GRAY_100,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  ScanContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 18,
  },
  info: {
    fontSize: 20,
    fontStyle: 'normal',
    fontFamily: fonts.Pretendard_Bold,
    lineHeight: 26,
    textAlign: 'center',
    color: colors.GRAY_70,
  },
  descriptiveInfo: {
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: fonts.Pretendard_Regular,
    lineHeight: 16.8,
    textAlign: 'center',
    color: colors.GRAY_60,
    alignSelf: 'center',
  },
  addMealButton: {
    ...commonStyles.row,
    columnGap: 6,
    borderWidth: 1.5,
    borderColor: colors.PRIMARY_BLUE,
    minHeight: 31,
    borderRadius: 17,
    paddingVertical: 8,
    paddingHorizontal: 18,
    display: 'flex',
    marginTop: 20,
  },
  mealButtonLabel: {
    fontSize: 14,
    fontStyle: 'normal',
    fontFamily: fonts.Pretendard_Bold,
    lineHeight: 16.8,
    textAlign: 'center',
    color: colors.PRIMARY_BLUE,
    alignSelf: 'center',
  },
  cancelButton: {
    display: 'flex',
    width: 110,
    paddingVertical: 14,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 24,
    backgroundColor: colors.GRAY_5,
  },
  buttonLable: {
    fontSize: 17,
    fontStyle: 'normal',
    lineHeight: 20.4,
    color: colors.GRAY_100,
    fontFamily: fonts.Pretendard_Bold,
  },
  scanButton: {
    ...commonStyles.row,
    display: 'flex',
    minHeight: 48,
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    borderRadius: 24,
    backgroundColor: colors.PRIMARY_BLUE,
    minWidth: 215,
    rowGap: 8,
  },
});
