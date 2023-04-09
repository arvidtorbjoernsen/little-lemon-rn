import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import Button from './Button';

const MenuBreakdown = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
      <View style={styles.buttonContainer}>
        <Button text='Starters' />
        <Button text='Mains' />
        <Button text='Desserts' />
        <Button text='Drinks' />
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
    paddingVertical: 30,
    backgroundColor: '#Karla-Regular',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  border: {
    borderBottomColor: '#E4E5E5',
    borderBottomWidth: 1,
    paddingTop: 20,
    paddingBottom: 10,
  },
});
