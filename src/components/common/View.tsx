import {styled} from 'nativewind';
import {View as OriginalView, ViewProps} from 'react-native';
import {StyledCommonProps} from '.';

const Styled = styled(OriginalView);

export function View({
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
