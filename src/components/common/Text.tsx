import {styled} from 'nativewind';
import {Text as OriginalText, TextProps} from 'react-native';
import {StyledCommonProps} from '.';

const Styled = styled(OriginalText);

export function Text({
  className,
  children,
  ...props
}: StyledCommonProps & TextProps) {
  return (
    <OriginalText className={`font-pretendard ${className} `} {...props}>
      {children}
    </OriginalText>
  );
}
