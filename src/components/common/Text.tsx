import {styled} from 'nativewind';
import {Text as OriginalText, TextProps} from 'react-native';
import {StyledCommonProps} from '.';

const Styled = styled(OriginalText);

export function Text({
  className,
  children,
  ...props
}: StyledCommonProps & TextProps) {
  const css = `font-pretendard ${className}`;
  return (
    <OriginalText className={css} {...props}>
      {children}
    </OriginalText>
  );
}
