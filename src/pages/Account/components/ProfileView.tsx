import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import React from 'react';
import icons from 'components/icons';
import { colors } from 'assets/colors';

interface ProfileViewProps {
  username: string;
  email: string;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onPress, username, email }) => {
  return (
    <View style={styles.profileContainer}>
      <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 16 }}>
        <View style={styles.profile}>
          <Image source={icons.icon_user_solid} style={{ width: 26, height: 26 }} />
        </View>
        <View style={{ rowGap: 4 }}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <TouchableHighlight activeOpacity={0.7}
        underlayColor={colors.GRAY_10}
        style={{ padding: 4, borderRadius: 50 }} onPress={() => onPress()}>
        <Image source={icons.icon_arrow_forward_line_30} style={{ width: 16, height: 16 }} />
      </TouchableHighlight>
    </View>
  );
};

export default ProfileView;

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profile: {
    backgroundColor: colors.GRAY_10,
    width: 64,
    height: 64,
    padding: 19,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    borderRadius: 100,
  },
  username: {
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    color: colors.GRAY_100,
  },
  email: {
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 16.8,
    color: colors.GRAY_50,
  },
});
