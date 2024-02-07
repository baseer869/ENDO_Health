import {colors} from 'assets/colors';
import {fonts} from 'assets/fonts';
import icons from 'components/icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {commonStyles} from 'utils/styles/commonStyles';

interface MenuItemProps {
  title: string;
  email: string;
  onPress: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({title, email, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={{...commonStyles.rowWithSpaceBetween, columnGap: 6}}>
        <View style={commonStyles.row}>
          <Text style={styles.email}>{email}</Text>
        </View>
        <Image
          source={icons.icon_arrow_forward_line_30}
          style={{width: 16, height: 16}}
        />
      </View>
    </TouchableOpacity>
  );
};

//--//
const PersonalInformation: React.FC = ({navigation}: any) => {
  const navigateTo = (route: any) => {
    navigation.navigate(route);
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.GRAY_0} barStyle={'dark-content'} />
      {/* Profile View */}
      <View style={styles.profileView}>
        <Image source={icons.icon_user_solid} style={{width: 36, height: 36}} />
        <TouchableOpacity style={styles.addProfileButton}>
          <Image
            source={icons.icon_plus_line_30}
            style={{width: 16, height: 16}}
          />
        </TouchableOpacity>
      </View>
      {/*  */}
      <View style={{paddingHorizontal: 20, paddingTop: 30}}>
        <Text style={styles.label}>Account</Text>
        <View style={{paddingVertical: 15}}>
          <MenuItem title={'Email'} email={'chloe.hamilton@gmail.com'} />
          <MenuItem
            title={'Password'}
            email={'Change password'}
            onPress={() => navigateTo('UpdatePassword')}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_0,
  },
  profileView: {
    width: 88,
    height: 88,
    padding: 27,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    display: 'flex',
    borderRadius: 100,
    backgroundColor: colors.GRAY_10,
    alignSelf: 'center',
    marginTop: 25,
  },
  addProfileButton: {
    width: 30,
    height: 30,
    display: 'flex',
    padding: 7,
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 3,
    borderColor: colors.GRAY_0,
    backgroundColor: colors.BLUE_10,
    position: 'absolute',
    bottom: -2,
    right: 2,
  },
  label: {
    fontSize: 15,
    fontStyle: 'normal',
    fontFamily: fonts.Pretendard_Regular,
    lineHeight: 22,
    color: colors.GRAY_50,
  },
  menuItem: {
    ...commonStyles.rowWithSpaceBetween,
    paddingVertical: 16,
  },
  title: {
    fontSize: 17,
    fontFamily: fonts.Pretendard_Regular,
    lineHeight: 21,
    color: colors.GRAY_100,
    fontStyle: 'normal',
  },
  email: {
    fontSize: 16,
    fontFamily: fonts.Pretendard_Regular,
    lineHeight: 19.2,
    color: colors.GRAY_50,
    fontStyle: 'normal',
  },
});
