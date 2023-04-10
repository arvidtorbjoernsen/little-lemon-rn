import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import ButtonCmp from './ButtonCmp';

const MenuBreakdown = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
      <View style={styles.buttonContainer}>
        <ButtonCmp text='Starters' />
        <ButtonCmp text='Mains' />
        <ButtonCmp text='Desserts' />
        <ButtonCmp text='Drinks' />
      </View>
      <View style={styles.border}></View>
    </View>
  );
};

export default MenuBreakdown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#Karla-Regular',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  border: {
    borderBottomColor: '#E4E5E5',
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 10,
  },
});
