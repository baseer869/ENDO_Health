import {colors} from 'assets/colors';
import icons from 'components/icons';
import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

interface HeaderProps {
  aiName: string;
}

const Header: React.FC<HeaderProps> = ({aiName}) => {
  return (
    <View style={styles.header}>
      {/* AI Name */}
      <Text style={styles.aiName}>{aiName}</Text>

      {/* "With AI" Section */}
      <View style={styles.withAiContainer}>
        <Image source={icons.icon_aichat_solid} style={styles.icon} />
        <Text style={styles.text}>with AI</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.GRAY_0,
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    columnGap: 8,
  },
  aiName: {
    fontSize: 22,
    lineHeight: 28.6,
    fontWeight: '700',
    color: colors.GRAY_80,
  },
  withAiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 4,
  },
  icon: {
    width: 14,
    height: 14,
    tintColor: colors.GRAY_80,
  },
  text: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.GRAY_80,
  },
});
