import NfcManager from 'react-native-nfc-manager';
import {Platform} from 'react-native';

export const transceive = async (
  nfcManager: typeof NfcManager,
  cmd: number[],
): Promise<number[]> => {
  let time = Date.now();
  let retryInterval = 100; // 재시도 간격 (밀리초)
  let timeout = 2000; // 타임아웃 시간 (밀리초)

  while (true) {
    try {
      let replyBlock: number[];

      if (Platform.OS === 'ios') {
        // iOS 플랫폼에서 실행될 코드
        replyBlock = []; // iOS 구현 필요
      } else {
        // Android 플랫폼에서 실행될 코드
        replyBlock = await nfcManager.transceive(cmd);
      }

      console.debug('replyBlock', replyBlock);
      return replyBlock;
    } catch (e) {
      if (Date.now() > time + timeout) {
        console.error('NFC tag read timeout');
        return []; // 타임아웃 발생 시 빈 배열 반환
      }
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }
};
