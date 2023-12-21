import { FormikErrors } from 'formik';
import {
  TextInput as NativeTextInput,
  StyleProp,
  //StyleSheet,
  TextStyle
} from 'react-native';

interface TextInputProps {
  value: string;
  style?: StyleProp<TextStyle>;
  error?: string;
  placeholder: string;
  onBlur: (value: boolean, shouldValidate?: boolean) => void;
  onChangeText: (
    value: any,
    shouldValidate?: boolean
  ) => Promise<void | FormikErrors<any>>;
}

//const styles = StyleSheet.create({});

const TextInput = ({
  value,
  style,
  error,
  onBlur,
  onChangeText,
  ...props
}: TextInputProps) => {
  const textInputStyle = [style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
