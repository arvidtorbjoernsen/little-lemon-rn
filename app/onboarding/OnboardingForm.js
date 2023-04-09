import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const OnboardingForm = ({ submitHandler }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={styles.container}
    >
      <View style={styles.toplineContainer}>
        <Text style={styles.text}>Let us get to know you</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : ''}
        style={styles.formContainer}
      >
        <Formik
          initialValues={{ firstName: '', email: '' }}
          onSubmit={(values) => {
            submitHandler(values);
          }}
          validationSchema={yup.object().shape({
            firstName: yup.string().required('Please, provide your name!'),
            email: yup
              .string()
              .email()
              .required('Please, provide your valid email!'),
          })}
        >
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <View style={styles.inputContainer}>
                <Text style={styles.formText}>First Name</Text>
                <View style={styles.spacer} />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                  value={values.firstName}
                />
                {touched.firstName && errors.firstName && (
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>
                    {errors.firstName}
                  </Text>
                )}
                <View style={styles.spacer} />
                <Text style={styles.formText}>Email</Text>
                <View style={styles.spacer} />
                <TextInput
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  value={values.email}
                  keyboardType='email-address'
                />
                {touched.email && errors.email && (
                  <Text style={{ fontSize: 12, color: '#FF0D10' }}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View style={styles.spacer} />
              <View style={styles.actionContainer}>
                <Pressable
                  style={styles.button}
                  disabled={!isValid}
                  onPress={() => handleSubmit(values)}
                >
                  <Text style={styles.buttonText}>Next</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

export default OnboardingForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#CBD3D8',
  },
  toplineContainer: {
    justifyContent: 'center',
    height: '20%',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '30%',
  },
  text: {
    fontSize: 25,
    color: '#455967',
    fontFamily: 'Karla-Regular',
  },
  formText: {
    fontSize: 25,
    color: '#455967',
    fontFamily: 'Karla-Regular',
  },
  inputContainer: {
    width: '100%',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    fontSize: 20,
    width: '80%',
    paddingHorizontal: 10,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#455967',
    borderRadius: 10,
  },
  spacer: {
    height: 5,
  },
  actionContainer: {
    width: '100%',
    height: 80,
    paddingRight: 30,
    backgroundColor: '#F0F5F7',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  button: {
    color: '#455967',
    backgroundColor: '#CAD2D8',
    width: 100,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
  },
});
