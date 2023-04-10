import React, { useState } from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HeroImage from '../../assets/images/HeroImage.png';
import { Ionicons } from '@expo/vector-icons';
import { useRecoilState } from 'recoil';
import { searchState } from '../../atoms/searchState';

const Hero = () => {
  const [searchWord, setSearchWord] = useRecoilState(searchState);
  const [searchActive, setSearchActive] = useState(false);

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.heroHeading}>Little Lemon</Text>
      <View style={styles.innerContainer}>
        <View style={styles.leftFrame}>
          <Text style={styles.subHeading}>Chicago</Text>
          <Text style={styles.bodyText}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <View style={styles.rightFrame}>
          <Image
            style={{
              width: 140,
              height: 140,
              borderRadius: 20,
              resizeMode: 'cover',
            }}
            source={HeroImage}
          />
        </View>
      </View>
      <Pressable
        style={styles.searchBox}
        onPress={() => setSearchActive(!searchActive)}
      >
        {searchActive ? (
          <View style={styles.searchInputContainer}>
            <Ionicons name='search' size='30' color='#495E57' />
            <TextInput
              style={styles.textInput}
              value={searchWord}
              onChangeText={(text) => setSearchWord(text)}
            />
          </View>
        ) : (
          <View style={styles.searchButton}>
            <Ionicons name='search' size='30' color='#495E57' />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#495E57',
    flexDirection: 'column',
    height: '100%',
    paddingHorizontal: 10,
  },
  heroHeading: {
    color: '#F2CF14',
    fontSize: 55,
    lineHeight: 55,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Regular',
  },
  subHeading: {
    color: '#ECEEEE',
    fontSize: 35,

    fontFamily: 'MarkaziText-Regular',
  },
  innerContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  bodyText: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: '#ECEEEE',
  },
  leftFrame: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '55%',
  },
  rightFrame: {},
  searchBox: {
    paddingTop: 20,
    width: '100%',
    display: 'flex',

    justifyContent: 'center',
  },
  searchButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#ECEEEE',
  },
  searchIcon: {
    color: '#495E57',
    fontSize: 30,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEEEE',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 55,
    borderRadius: 10,
    marginBottom: 10,
  },
  textInput: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#ECEEEE',
    height: 50,
    width: '85%',
    borderRadius: 10,
    fontSize: 20,
  },
});
