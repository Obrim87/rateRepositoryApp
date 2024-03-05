import { StyleSheet, TextInput } from 'react-native';
import { useField } from 'formik';
import { Text } from './Text';
import theme from '../theme';
//import TextInput from './TextInput';

interface FormikTextInputProps {
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<any>) => void;
  secureTextEntry?: boolean;
  multiline?: boolean;
}

const FormikTextInput = (props: FormikTextInputProps) => {
  const [input, meta, helpers] = useField(props.name);
  const showError = meta.touched && meta.error;

  const styles = StyleSheet.create({
    errorText: {
      marginLeft: 12,
      marginBottom: 15,
      color: theme.colors.error
    },
    textInput: {
      padding: 15,
      margin: 10,
      borderRadius: 3,
      shadowRadius: 5,
      borderColor: showError ? theme.colors.error : 'grey',
      borderWidth: 1
    },
    multilineTextInput: {
      height: 150,
      padding: 15,
      paddingTop: 15,
      margin: 10,
      borderRadius: 3,
      shadowRadius: 5,
      borderColor: showError ? theme.colors.error : 'grey',
      borderWidth: 1
    }
  });

  return (
    <>
      <TextInput
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={input.value}
        placeholder={props.placeholder}
        style={props.multiline ? styles.multilineTextInput : styles.textInput}
        secureTextEntry={props.secureTextEntry ? true : false}
        multiline={props.multiline}
        //error={meta.error}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
