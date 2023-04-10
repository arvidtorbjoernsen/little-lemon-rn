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
import axios from 'axios';
import { menuItemsState } from '../atoms/menuItems';
import * as SQLite from 'expo-sqlite';

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const [menuItems, setMenuItems] = useRecoilState(menuItemsState);
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const db = SQLite.openDatabase('db.db');
  const [dbIsLoading, setDbIsLoading] = useState(false);

  // try {
  //   db.transaction((tx) => {
  //     tx.executeSql(
  //       'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT , name TEXT, price TEXT, description TEXT, image TEXT);'
  //     );
  //   });
  // } catch (e) {
  //   console.log('DbError', e);
  // }

  const fetchMenuItems = async () => {
    // try {
    //   db.transaction((tx) => {
    //     tx.executeSql('SELECT * FROM items', [], (_, { rows: { _array } }) =>
    //       console.log('db', _array)
    //     );
    //   });
    // } catch (e) {
    //   console.log('error', e);
    // }

    //if (menuItems.length === 0) {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const { data } = response;
      const stringedData = JSON.stringify(data);
      const menuIt = JSON.parse(stringedData);
      setMenuItems(menuIt.menu);
    } catch (e) {
      console.log('error', e);
    }
    //}
  };

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
      });
    } catch (e) {
      console.log('error', e);
    }
    router.push('/profile');
  };

  const getUserFromStorage = async () => {
    try {
      const response = await AsyncStorage.getItem('@user');
      if (response !== null) {
        const user = JSON.parse(response);
        setIsOnboarded(true);
        setUser(user);
      }
    } catch (e) {
      console.log('error', e);
    }
  };

  // const saveMenuItemsToDb = () => {
  //   menuItems.map((item) => {
  //     db.transaction((tx) => {
  //       tx.executeSql(
  //         'INSERT INTO items (name, price, description, image) VALUES (?, ?, ?, ?)',
  //         [item.name, item.price, item.description, item.image]
  //       );
  //     });
  //   });
  // };

  useEffect(() => {
    getUserFromStorage();

    // if (menuItems.length === null) {
    //   setDbIsLoading(true);
    fetchMenuItems();
    //   saveMenuItemsToDb();
    //
    setDbIsLoading(false);
    // }
    // setDbIsLoading(false);
  }, []);

  const LogoTitle = () => {
    return <Image style={{ height: 40 }} source={Logo} />;
  };

  const ProfileImage = () => {
    return (
      <Pressable
        onPress={() => {
          router.push({
            pathname: '/profile',
          });
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 50 }}
          source={user.image ? { uri: user.image } : null}
          defaultSource={ProfileImagePlaceholder}
        />
      </Pressable>
    );
  };

  if (dbIsLoading) {
    return null;
  }

  if (!isOnboarded) {
    return <Onboarding submitHandler={submitHandler} />;
  }
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => <LogoTitle />,
          headerRight: () => <ProfileImage />,
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
    height: '15%',
  },
  MenuContainer: {
    width: '100%',
    height: '45%',
  },
});
