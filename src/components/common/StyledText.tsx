import {styled} from 'nativewind';
import {ReactNode} from 'react';
import {Text} from 'react-native';

const ST = styled(Text);

export type StyledTextProps = {
  className: string;
  children?: ReactNode;
};

export function StyledText({className, children}: StyledTextProps) {
  return <ST className={`font-pretendard ${className}`}>{children}</ST>;
}
