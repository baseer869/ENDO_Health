import React, {forwardRef, useCallback} from 'react';
import {View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import {SharedValue} from 'react-native-reanimated';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

interface CustomBottomModal extends Omit<BottomSheetModalProps, 'snapPoints'> {
  snapPoints?: Array<string | number> | SharedValue<Array<string | number>>;
  isHandleComponent?: boolean;
}

const BottomModal = forwardRef((props: CustomBottomModal, ref: any) => {
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        opacity={0.1}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      backgroundStyle={{backgroundColor: 'white'}}
      handleComponent={props.isHandleComponent ? undefined : () => <View />}
      ref={ref}
      backdropComponent={renderBackdrop}
      {...props}
      snapPoints={props.snapPoints ? props.snapPoints : ['50%', '45%']}>
      {props.children}
    </BottomSheetModal>
  );
});

export default BottomModal;
