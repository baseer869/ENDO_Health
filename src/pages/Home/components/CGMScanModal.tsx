import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { colors } from 'assets/colors';
import { fonts } from 'assets/fonts';

interface CGMScanModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const CGMScanModal: React.FC<CGMScanModalProps> = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropColor={colors.GRAY_70}
      backdropOpacity={0.7}
      useNativeDriverForBackdrop
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <Text style={styles.title}>Ready to Scan</Text>
        <Text style={styles.description}>Hold your iPhone near your CGM to scan your data.</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 10,
    marginBottom: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 20,
    paddingBottom: 40, // Adjust as needed
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.Pretendard_Regular,
    marginBottom: 10,
    color: colors.GRAY_40,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    color: colors.GRAY_60,
  },
  button: {
    backgroundColor: colors.GRAY_5,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CGMScanModal;
