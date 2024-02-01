import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useRef} from 'react';
import {colors} from 'assets/colors';
import BasicInput from '../../components/common/BasicInput';
import {fonts} from 'assets/fonts';
import icons from 'components/icons';

const UpdatePassword = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);
  const buttonRef = useRef<TouchableOpacity>(null);

  const handleBlur = () => {
    setIsFocus(false);
  };

  const handleFocus = inputRef => {
    setIsFocus(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.inputLabel}>New password</Text>
          <BasicInput
            // ref={passwordRef}
            onFocus={() => handleFocus(passwordRef)}
            onBlur={handleBlur}
            style={styles.input}
            isValid={true}
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={text => setPassword(text)}
          />
        </View>
        {/* confirm pass */}
        <View style={{paddingTop: 30}}>
          <Text style={styles.inputLabel}>Re-enter new password</Text>
          <BasicInput
            ref={confirmPasswordRef}
            onFocus={() => handleFocus(confirmPasswordRef)}
            onBlur={handleBlur}
            style={styles.input}
            isValid={true}
            placeholder="Enter password once more"
            secureTextEntry
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
          />
        </View>
      </View>
      {/* handle Submit */}
      <TouchableOpacity
        ref={buttonRef}
        activeOpacity={0.7}
        style={
          password && confirmPassword
            ? {...styles.onButton}
            : {...styles.onButton, ...styles.offButton}
        }
        onPress={() => onSubmit()}>
        <Text style={styles.Btnlabel}>Get Started</Text>
        <Image
          source={icons.direction_forward_line_30}
          style={{width: 16, height: 16}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.GRAY_0,
  },
  inputContainer: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 2,
    borderColor: colors.GRAY_20,
    fontSize: 17,
    color: colors.GRAY_90,
    paddingVertical: 4,
  },
  inputLabel: {
    fontSize: 14,
    lineHeight: 17,
    fontFamily: fonts.Pretendard_Regular,
    color: colors.GRAY_60,
  },
  Btnlabel: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.Pretendard_Bold,
    color: colors.GRAY_0,
  },
  onButton: {
    display: 'flex',
    height: 48,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'stretch',
    borderRadius: 24,
    backgroundColor: colors.PRIMARY_BLUE,
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 20,
    width: '90%',
  },
  offButton: {
    backgroundColor: colors.GRAY_5,
  },
});
