import {styled} from 'nativewind';
import {SafeAreaView as OriginalView, ViewProps} from 'react-native';
import {StyledCommonProps} from '.';

const Styled = styled(OriginalView);

export function SafeAreaView({
  className,
  children,
  ...props
}: StyledCommonProps & ViewProps) {
  return (
    <Styled className={`font-pretendard ${className}`} {...props}>
      {children}
    </Styled>
  );
}
