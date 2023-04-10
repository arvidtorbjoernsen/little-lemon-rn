import React, { useEffect, useState } from 'react';

import { FlatList, Text, View } from 'react-native';
import FoodMenuItem from './foodMenuItem';
import uuid from 'react-native-uuid';
import { useRecoilState } from 'recoil';
import { menuItemsState } from '../../atoms/menuItems';
import { filterState } from '../../atoms/filterState';
import { searchState } from '../../atoms/searchState';

const renderItem = ({ item }) => {
  return <FoodMenuItem item={item} />;
};

const FoodMenuList = () => {
  const [{ Starters, Mains, Desserts, Drinks }] = useRecoilState(filterState);
  const [searchWord] = useRecoilState(searchState);
  const [menuItems] = useRecoilState(menuItemsState);
  const [searchedMenuItems, setSearchedMenuItems] = useState(menuItems);
  const [filteredMenuItems, setFilteredMenuItems] = useState(searchedMenuItems);

  useEffect(() => {
    if (searchWord) {
      const searchMenuItems = menuItems.filter((item) => {
        if (item.name.toLowerCase().includes(searchWord.toLowerCase())) {
          return item;
        }
      });
      setSearchedMenuItems(searchMenuItems);
    } else {
      setSearchedMenuItems(menuItems);
    }

    if (!Starters && !Mains && !Desserts && !Drinks) {
      setFilteredMenuItems(searchedMenuItems);
    } else {
      const filterMenuItems = searchedMenuItems.filter((item) => {
        if (item.category.toLowerCase() === 'starters' && Starters) {
          return item;
        } else if (item.category.toLowerCase() === 'mains' && Mains) {
          return item;
        } else if (item.category.toLowerCase() === 'desserts' && Desserts) {
          return item;
        } else if (item.category.toLowerCase() === 'drinks' && Drinks) {
          return item;
        }
      });
      setFilteredMenuItems(filterMenuItems);
    }
  }, [Starters, Mains, Desserts, Drinks, searchWord]);

  if (filteredMenuItems.length === 0) {
    return (
      <View style={{ alignSelf: 'center', paddingTop: 20 }}>
        <Text style={{ fontSize: 16 }}>
          No items to display. Maybe try another search.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ width: '100%' }}>
      <FlatList
        data={filteredMenuItems}
        renderItem={renderItem}
        keyExtractor={() => uuid.v4().toString()}
      />
    </View>
  );
};

export default FoodMenuList;
