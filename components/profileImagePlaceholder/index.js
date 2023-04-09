import React from 'react';

import { Text, View } from 'react-native';

const ProfileImagePlaceholder = (firstName, lastName) => {
  const initials = `${firstName[0]}${lastName[0] ? lastName[0] : ''}`;
  return (
    <View>
      <Text>{initials.toUpperCase()}</Text>
    </View>
  );
};

export default ProfileImagePlaceholder;
