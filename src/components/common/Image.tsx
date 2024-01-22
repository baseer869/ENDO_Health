import {styled} from 'nativewind';
import {ImageProps, Image as Original} from 'react-native';
import {StyledCommonProps} from '.';

const Styled = styled(Original);

export function Image({className, ...props}: StyledCommonProps & ImageProps) {
  return <Styled className={`${className}`} {...props} />;
}
