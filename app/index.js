import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Hero from '../components/hero';
import MenuBreakdown from '../components/menuBreakdown';
import FoodMenuList from '../components/foodMenuList';
import Onboarding from './onboarding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/images/Logo.png';
import { useRecoilState } from 'recoil';
import { userState } from '../atoms/User';
import ProfileImagePlaceholder from '../assets/images/profile-placeholder.jpg';

const Home = () => {
  const [user, setUser] = useRecoilState(userState);

  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState(false);

  const submitHandler = async (props) => {
    const { firstName, email } = props;
    try {
      await AsyncStorage.setItem(
        '@user',
        JSON.stringify({
          firstName: firstName,
          email: email,
        })
      );
      setIsOnboarded(true);
      setUser({
        ...user,
        firstName: firstName,
        email: email,
        image: '../assets/images/profile-placeholder.jpg',
      });
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    const getUserFromStorage = async () => {
      try {
        const response = await AsyncStorage.getItem('@user');
        if (response !== null) {
          const user = JSON.parse(response);
          setIsOnboarded(true);
          setUser(user);
          console.log('user', user);
        }
      } catch (e) {
        console.log('error', e);
      }
    };
    getUserFromStorage();
  }, []);

  const LogoTitle = () => {
    return <Image style={{ height: 40 }} source={Logo} />;
  };

  const ProfileImage = ({ image }) => {
    return (
      <Pressable
        onPress={() => {
          router.push({
            pathname: '/profile',
          });
        }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={ProfileImagePlaceholder}
        />
      </Pressable>
    );
  };

  const profilePressed = () => {};

  if (!isOnboarded) {
    return <Onboarding submitHandler={submitHandler} />;
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <LogoTitle />,
          headerRight: () => <ProfileImage image={{ uri: user.image }} />,
        }}
      ></Stack.Screen>
      <View style={styles.heroContainer}>
        <Hero />
      </View>
      <View style={styles.breakdownContainer}>
        <MenuBreakdown />
      </View>
      <View style={styles.MenuContainer}>
        <FoodMenuList />
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  heroContainer: {
    height: '40%',
  },
  breakdownContainer: {
    height: '20%',
  },
  MenuContainer: {
    height: '50%',
  },
});
