import React, { useEffect, useRef } from 'react';

import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Formik } from 'formik';
import { CheckBox } from 'react-native-elements';
import * as yup from 'yup';
import 'yup-phone-lite';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { userState } from '../../atoms/User';
import Logo from '../../assets/images/Logo.png';
import { Ionicons } from '@expo/vector-icons';
import ProfileImagePlaceholder from '../../assets/images/profile-placeholder.jpg';

const Profile = () => {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);
  const router = useRouter();
  const formikRef = useRef();

  useEffect(() => {
    formikRef.current.setFieldValue('firstName', user.firstName);
    formikRef.current.setFieldValue('lastName', user.lastName);
    formikRef.current.setFieldValue('email', user.email);
    formikRef.current.setFieldValue('phone', user.phone);
    formikRef.current.setFieldValue('image', user.image);
    formikRef.current.setFieldValue('orderStatus', user.orderStatus);
    formikRef.current.setFieldValue('passwordChanges', user.passwordChanges);
    formikRef.current.setFieldValue('specialOffers', user.specialOffers);
    formikRef.current.setFieldValue('newsletter', user.newsletter);
  }, [user]);

  const userValidationSchema = yup.object().shape({
    firstName: yup.string().required('Please, provide your first name!'),
    lastName: yup.string().required('Please, provide your last name!'),
    email: yup.string().email().required('Please, provide your email!'),
    phone: yup
      .string()
      .phone('US', 'Please enter a valid phone number')
      .required('Please, provide your phone number!'),
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUser({ ...user, image: result.assets[0].uri });
      formikRef.current.setFieldValue('image', result.assets[0].uri);
    }
  };

  const handleSaveChanges = async (values) => {
    try {
      const updatedUser = {
        image: values.image,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        orderStatus: values.orderStatus,
        passwordChanges: values.passwordChanges,
        specialOffers: values.specialOffers,
        newsletter: values.newsletter,
      };
      setUser(updatedUser);
      await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
    } catch (e) {
      console.log(e);
    }
  };

  const CustomBackButton = () => {
    return (
      <Pressable onPress={() => router.back()}>
        <View style={styles.backArrow}>
          <Ionicons name='arrow-back' size={24} color='white' />
        </View>
      </Pressable>
    );
  };

  const LogoTitle = () => {
    return <Image style={{ height: 40 }} source={Logo} />;
  };

  const handleLogout = () => {
    try {
      AsyncStorage.getAllKeys().then((keys) => AsyncStorage.multiRemove(keys));
      resetUser();
      router.replace('onboarding');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerLeft: () => <CustomBackButton />,
          headerTitle: () => <LogoTitle />,
          headerRight: () => (
            <Image
              style={{ width: 40, height: 40, borderRadius: 50 }}
              source={user.image ? { uri: user.image } : null}
              defaultSource={ProfileImagePlaceholder}
            />
          ),
        }}
      />
      <ScrollView style={styles.background}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formContainer}
          >
            <Formik
              innerRef={formikRef}
              enableReinitialize={true}
              validationSchema={userValidationSchema}
              initialValues={{
                image: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                orderStatus: false,
                passwordChanges: false,
                specialOffers: false,
                newsletter: false,
              }}
              onSubmit=''
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
                setFieldValue,
              }) => (
                <View>
                  <Text style={styles.headerText}>Personal information</Text>
                  <Text style={styles.avatarText}>Avatar</Text>
                  <View style={styles.userButtons}>
                    <Pressable onPress={() => pickImage()}>
                      <View>
                        <Image
                          style={{ width: 80, height: 80, borderRadius: 50 }}
                          source={user.image ? { uri: user.image } : null}
                          defaultSource={ProfileImagePlaceholder}
                        />
                      </View>
                    </Pressable>
                    <Pressable style={[styles.changeButton, styles.button]}>
                      <Text
                        style={[styles.changeButtonText, styles.buttonText]}
                      >
                        Change
                      </Text>
                    </Pressable>
                    <Pressable style={[styles.removeButton, styles.button]}>
                      <Text
                        style={[styles.removeButtonText, styles.buttonText]}
                      >
                        Remove
                      </Text>
                    </Pressable>
                  </View>
                  <View style={styles.formComp}>
                    <Text style={styles.formText}>First name</Text>
                    <TextInput
                      name='firstName'
                      style={styles.input}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
                      value={values.firstName}
                    />
                    {errors.firstName && touched.firstName && (
                      <Text style={styles.errorText}>{errors.firstName}</Text>
                    )}
                  </View>
                  <View style={styles.formComp}>
                    <Text style={styles.formText}>Last name</Text>
                    <TextInput
                      name='lastName'
                      style={styles.input}
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                    />
                    {errors.lastName && touched.lastName && (
                      <Text style={styles.errorText}>{errors.lastName}</Text>
                    )}
                  </View>
                  <View style={styles.formComp}>
                    <Text style={styles.formText}>Email</Text>
                    <TextInput
                      name='email'
                      keyboardType='email-address'
                      style={styles.input}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </View>
                  <View style={styles.formComp}>
                    <Text style={styles.formText}>Phone number</Text>
                    <TextInput
                      name='phone'
                      keyboardType='phone-pad'
                      style={styles.input}
                      onChangeText={handleChange('phone')}
                      onBlur={handleBlur('phone')}
                      value={values.phone}
                    />
                    {errors.phone && touched.phone && (
                      <Text style={styles.errorText}>{errors.phone}</Text>
                    )}
                  </View>

                  <Text style={styles.headerText}>Email notifications</Text>
                  <View style={styles.checkBoxComp}>
                    <CheckBox
                      containerStyle={styles.checkBox}
                      checkedIcon='check-box'
                      iconType='material'
                      uncheckedIcon='check-box-outline-blank'
                      title='Order statuses'
                      checked={values.orderStatus}
                      onPress={() =>
                        setFieldValue('orderStatus', !values.orderStatus)
                      }
                    />
                    <CheckBox
                      containerStyle={styles.checkBox}
                      checkedIcon='check-box'
                      iconType='material'
                      uncheckedIcon='check-box-outline-blank'
                      title='Password changes'
                      checked={values.passwordChanges}
                      onPress={() =>
                        setFieldValue(
                          'passwordChanges',
                          !values.passwordChanges
                        )
                      }
                    />
                    <CheckBox
                      containerStyle={styles.checkBox}
                      checkedIcon='check-box'
                      iconType='material'
                      uncheckedIcon='check-box-outline-blank'
                      title='Special offers'
                      checked={values.specialOffers}
                      onPress={() =>
                        setFieldValue('specialOffers', !values.specialOffers)
                      }
                    />
                    <CheckBox
                      containerStyle={styles.checkBox}
                      checkedIcon='check-box'
                      iconType='material'
                      uncheckedIcon='check-box-outline-blank'
                      title='Newsletter'
                      checked={values.newsletter}
                      onPress={() =>
                        setFieldValue('newsletter', !values.newsletter)
                      }
                    />
                  </View>
                  <Pressable style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Log out</Text>
                  </Pressable>
                  <View style={styles.lastButtonsContainer}>
                    <Pressable
                      style={[styles.discardButton, styles.bottomButton]}
                    >
                      <Text style={styles.discardButtonText}>
                        Discard changes
                      </Text>
                    </Pressable>
                    <Pressable
                      style={[styles.saveButton, styles.bottomButton]}
                      onPress={() => handleSaveChanges(values)}
                    >
                      <Text style={styles.saveButtonText}>Save changes</Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </Formik>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerProfile: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  background: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
    borderColor: '#C4CBC8',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  backArrow: {
    backgroundColor: '#495E57',
    borderRadius: 50,
    padding: 5,
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Karla-Regular',
    fontWeight: 'bold',
  },
  avatarText: {
    fontSize: 12,
    marginBottom: 5,
    fontFamily: 'Karla-Regular',
    color: '#afb4b4',
  },
  userButtons: {
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  button: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontFamily: 'Karla-Regular',
  },
  changeButton: {
    backgroundColor: '#495E57',
    borderRadius: 10,
  },
  changeButtonText: {
    color: '#C4CBC8',
  },
  removeButton: {
    borderColor: '#C4CBC8',
    borderWidth: 1,
  },
  removeButtonText: {
    color: '#C4CBC8',
  },
  formContainer: {
    width: '100%',
  },

  formComp: {
    paddingBottom: 10,
  },
  formText: {
    fontSize: 15,
  },
  input: {
    width: '100%',
    height: 30,
    paddingHorizontal: 10,
    borderColor: '#C4CBC8',
    borderWidth: 1,
    borderRadius: 5,
  },

  errorText: {
    color: 'red',
  },

  checkBoxComp: {
    display: 'flex',
    alignItems: 'flex-start',
  },

  checkBox: {
    backgroundColor: '#fff',
    borderWidth: 0,
    margin: 0,
  },
  logoutButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2CF14',
    width: '100%',
    height: 40,
    fontFamily: 'Karla-Regular',
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  lastButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
    marginBottom: 150,
  },
  bottomButton: {
    width: 140,
    height: 40,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  discardButton: {
    borderColor: '#869490',
    borderWidth: 1,
  },
  discardButtonText: {
    color: '#869490',
  },
  saveButton: {
    backgroundColor: '#495E57',
  },
  saveButtonText: {
    color: '#869490',
  },
});
