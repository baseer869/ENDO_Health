import {ReactNode} from 'react';

export * from './Text';
export * from './Button';
export * from './Image';
export * from './View';
export * from './SafeAreaView';

export type StyledCommonProps = {
  className?: string;
  children?: ReactNode;
};
