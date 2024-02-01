import { colors } from 'assets/colors';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import ProfileView from './components/ProfileView';
import icons from 'components/icons';
import { commonStyles } from 'utils/styles/commonStyles';
import AppSettingItem from './components/AppSettingItem';

const MenuTitle = ({ title }) => <Text style={styles.title}>{title}</Text>

const MyAccount: React.FC = ({navigation}) => {

  const navigateTo = (route) =>{
    navigation.navigate(route);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20, }} showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>Account</Text>

        {/* render user profile */}
        <ProfileView  username={"Chloe Mörets"} email={"chloe.hamilton@gmail.com"} onPress={()=> navigateTo('PersonalInformation')} />
        <View style={styles.seperator} />

        {/* section */}
        <View style={{ paddingVertical: 10 }}>
          {/* Manage Medical Data */}
          <TouchableOpacity  style={{ ...commonStyles.rowWithSpaceBetween, height: 52 }}>
            <View style={{ ...commonStyles.row, columnGap: 12 }}>
              <Image source={icons.icon_profile_line_30} style={{ width: 18, height: 18 }} />
              <Text style={styles.label}>Manage medical data</Text>
            </View>
            <Image source={icons.icon_arrow_forward_line_30} style={{ width: 16, height: 16 }} />
          </TouchableOpacity>
          {/* App Settings */}
          <View style={styles.appSettingContainer}>
            <MenuTitle title={'App settings'} />
            <AppSettingItem label={'Notification'} settingStatus={'On'} icon={icons.icon_notification_on_line_30} arrowForward={true} />

            <AppSettingItem label={'Connected Device'} settingStatus={'Abcott Lifestyle'} icon={icons.icon_scan2_line_30} arrowForward={true} />
          </View>
          {/* support */}
          <View style={styles.appSettingContainer}>
            <MenuTitle title={'Information and Support'} />
            <AppSettingItem label={'Announcements'} icon={icons.icon_notice_line_30} arrowForward={false} />
            <AppSettingItem label={'Help Center'} subLable={'Ask for help or give feedbacks'} icon={icons.icon_information_line_30} arrowForward={false} />
          </View>
          {/* Terms  */}
          <View style={styles.appSettingContainer}>
            <MenuTitle title={'Terms and Policies'} />
            <AppSettingItem label={'Privacy policy'} arrowForward={false} />
            <AppSettingItem label={'Terms of use'} arrowForward={false} />
            <AppSettingItem label={'Opensource license'} arrowForward={false} />
            {/* app version */}
            <View style={{...commonStyles.rowWithSpaceBetween, minHeight: 52}}>
              <Text style={styles.version}>App Version</Text>
              <Text style={styles.versionNumber}>0.0.1</Text>
            </View>
          </View>
          {/* Account */}
          <View style={styles.appSettingContainer}>
            <MenuTitle title={'Login'} />
            <AppSettingItem label={'Logout'} arrowForward={false} />
            <AppSettingItem label={'Delete account'} arrowForward={false} />
          </View>
        </View>
        <View style={{ height: 50}}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MyAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_0,
  },
  text: {
    fontSize: 28,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 35,
    color: colors.GRAY_80
  },
  seperator: {
    height: 1,
    backgroundColor: colors.GRAY_20,
    marginTop: 20
  },
  label: {
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.4,
    // fontFamily:"",
    color: colors.GRAY_90
  },
  title: {
    fontSize: 15,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 21.62,
    // fontFamily:"",
    color: colors.GRAY_50,
    paddingBottom: 17
  },
  appSettingContainer: {
    paddingTop: 40
  },
  version:{
    fontSize: 17,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 20.4,
    // fontFamily:"",
    color: colors.GRAY_90
  },
  versionNumber:{
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19.2,
    // fontFamily:"",
    color: colors.GRAY_50,
  }

});
