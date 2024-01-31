import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function WidthDrawResult() {
  return (
    <View style={styles.frame525439362}>
      <View style={styles.graphic_construction}></View>
      <View style={styles.frame525439363}>
        <View style={styles.frame525439272}>
          <View style={styles.frame4368}>
            <View style={styles.frame4369}>
              <View style={styles.frame4371}>
                <Text style={styles.weresorrytoseeyougo}>
                  {`We’re sorry to see you go`}
                </Text>
              </View>
            </View>
            <Text
              style={
                styles.youraccounthasbeendeletedandyourDatawillbewipedoutindaysFeelfreetocontactus
              }>
              {`Your account has been deleted and your\nData will be wiped out in days.\nFeel free to contact us.`}
            </Text>
          </View>
        </View>
        {/* Vigma RN:: can be replaced with <Button_H34Icon_text props={"Error while retrieving the variants of your Figma component-set. Might be caused by special characters such as commas in the variant names."} /> */}
        <View style={styles.button_H34Icon_text}>
          {/* Vigma RN:: can be replaced with <Icon_mail_line_30  /> */}
          <View style={styles.icon_mail_line_30}></View>
          <View style={styles.text}>
            <Text style={styles.label}>{`Send your experience`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  frame525439362: {
    flexShrink: 0,
    alignItems: 'center',
    rowGap: 36,
  },
  graphic_construction: {
    flexShrink: 0,
    height: 150,
    width: 150,
    alignItems: 'flex-start',
    rowGap: 0,
  },
  group25: {
    position: 'absolute',
    flexShrink: 0,
    top: 12,
    height: 125,
    left: 13,
    width: 125,
  },
  frame525439363: {
    flexShrink: 0,
    alignItems: 'center',
    rowGap: 30,
  },
  frame525439272: {
    flexShrink: 0,
    alignItems: 'center',
    rowGap: 30,
  },
  frame4368: {
    flexShrink: 0,
    width: 303,
    alignItems: 'center',
    rowGap: 11,
  },
  frame4369: {
    alignSelf: 'stretch',
    flexShrink: 0,
    alignItems: 'flex-start',
    rowGap: 2,
  },
  frame4371: {
    alignSelf: 'stretch',
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    columnGap: 4,
  },
  weresorrytoseeyougo: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    textAlign: 'center',
    color: 'rgba(20, 22, 24, 1)',
    fontFamily: 'Pretendard',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 25.999999046325684,
  },
  youraccounthasbeendeletedandyourDatawillbewipedoutindaysFeelfreetocontactus: {
    alignSelf: 'stretch',
    flexShrink: 0,
    textAlign: 'center',
    color: 'rgba(98, 112, 121, 1)',
    fontFamily: 'Pretendard',
    fontSize: 15,
    fontWeight: '400',
    letterSpacing: 0,
    lineHeight: 21.750000715255737,
  },
  button_H34Icon_text: {
    flexShrink: 0,
    height: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 6,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderWidth: 0.5,
    borderColor: 'rgba(208, 216, 219, 1)',
    borderRadius: 17,
  },
  icon_mail_line_30: {
    flexShrink: 0,
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: 0,
  },
  mono: {
    position: 'absolute',
    flexShrink: 0,
    top: 2,
    right: 0,
    bottom: 1,
    left: 0,
    overflow: 'visible',
  },
  text: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 4,
  },
  label: {
    flexShrink: 0,
    textAlign: 'left',
    color: 'rgba(20, 22, 24, 1)',
    fontFamily: 'Pretendard',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0,
    lineHeight: 16.80000066757202,
  },
});
