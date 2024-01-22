import {useEffect, useState} from 'react';
import {Keyboard, KeyboardEvent, Platform} from 'react-native';
import {hasNotch} from 'react-native-device-info';

const useKeyboard = (): [number] => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  function onKeyboardDidShow(e: KeyboardEvent): void {
    if (Platform.OS === 'ios' && hasNotch()) {
      setKeyboardHeight(e.endCoordinates.height);
    } else {
      setKeyboardHeight(e.endCoordinates.height);
    }
  }

  function onKeyboardDidHide(): void {
    setKeyboardHeight(0);
  }

  useEffect(() => {
    const subscription = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      onKeyboardDidShow,
    );
    const subscription2 = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      onKeyboardDidHide,
    );
    return (): void => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  return [keyboardHeight];
};

export default useKeyboard;
