import React from 'react';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import HeroImage from '../../assets/images/HeroImage.png';
import { Ionicons } from '@expo/vector-icons';

const Hero = () => {
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
      <Pressable style={styles.searchBox}>
        <View style={styles.searchButton}>
          <Ionicons name='search' style={styles.searchIcon} />
        </View>
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
    fontSize: 60,
    lineHeight: 60,
    marginTop: 10,
    fontWeight: 'bold',
    fontFamily: 'MarkaziText-Regular',
  },
  subHeading: {
    color: '#ECEEEE',
    fontSize: 40,
    lineHeight: 40,
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
    paddingTop: 10,
    width: '100%',
    height: 70,
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
});
