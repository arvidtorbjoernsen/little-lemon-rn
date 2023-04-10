import React from 'react';

import { Pressable, Text, StyleSheet } from 'react-native';
import { useRecoilState } from 'recoil';
import { filterState } from '../../atoms/filterState';

const ButtonCmp = ({ text }) => {
  const [state, setState] = useRecoilState(filterState);
  return (
    <Pressable
      style={[styles.button, state[text] ? styles.buttonSelected : null]}
      onPress={() => {
        setState({ ...state, [text]: !state[text] });
      }}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
};

export default ButtonCmp;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E4E5E5',
    padding: 10,
    width: '22%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelected: {
    backgroundColor: '#F2CF14',
  },

  buttonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#495D57',
  },
});
