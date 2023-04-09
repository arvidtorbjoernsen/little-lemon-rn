import React from 'react';

import { Pressable, Text, StyleSheet } from 'react-native';

const Button = ({ text }) => {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E4E5E5',
    padding: 10,
    width: '22%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#495D57',
  },
});
