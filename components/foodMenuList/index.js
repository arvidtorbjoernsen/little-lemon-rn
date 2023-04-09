import React from 'react';

import { FlatList, Text, View } from 'react-native';
import FoodMenuItem from './foodMenuItem';
import uuid from 'react-native-uuid';

const renderItem = ({ item }) => {
  return <FoodMenuItem item={item} />;
};

const FoodMenuList = ({ menuItems }) => {
  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={() => uuid.v4().toString()}
      />
    </View>
  );
};

export default FoodMenuList;
