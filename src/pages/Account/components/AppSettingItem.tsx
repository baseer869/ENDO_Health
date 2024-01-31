import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {commonStyles} from 'utils/styles/commonStyles';
import {colors} from 'assets/colors';
import icons from 'components/icons';

interface AppSettingItemProps {
  label: string;
  subLable?: string;
  icon?: ImageSourcePropType;
  arrowForward?: boolean;
  settingStatus?: string;
  onPress?: () => void;
}

const AppSettingItem: React.FC<AppSettingItemProps> = ({
  label,
  subLable,
  icon,
  arrowForward,
  settingStatus,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{...commonStyles.rowWithSpaceBetween, minHeight: 52}}
      onPress={onPress}>
      <View style={{...commonStyles.row, columnGap: icon ? 12 : 0}}>
        {icon && <Image source={icon} style={{width: 18, height: 18}} />}
        <View style={{alignItems: 'flex-start', rowGap: 3}}>
          <Text style={styles.label}>{label}</Text>
          {subLable && <Text style={styles.subLable}>{subLable}</Text>}
        </View>
      </View>
      <View style={{...commonStyles.row, columnGap: 5}}>
        {settingStatus && (
          <Text style={styles.notificationStatus}>{settingStatus}</Text>
        )}
        {arrowForward && (
          <Image
            source={icons.icon_arrow_forward_line_30}
            style={{width: 16, height: 16}}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default AppSettingItem;

const styles = StyleSheet.create({
  label: {
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.4,
    // fontFamily:"",
    color: colors.GRAY_90,
  },
  subLable: {
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 15.6,
    // fontFamily:"",
    color: colors.GRAY_60,
  },
  notificationStatus: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.2,
    // fontFamily:"",
    color: colors.GRAY_50,
  },
});
