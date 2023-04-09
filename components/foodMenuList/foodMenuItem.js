import { Text, View, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import * as FileSystem from 'expo-file-system';

const FoodMenuItem = ({ item }) => {
  const [uri, setUri] = useState(null);

  useEffect(() => {
    try {
      FileSystem.downloadAsync(
        `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
        FileSystem.documentDirectory + item.image
      )
        .then(({ uri }) => {
          setUri(uri);
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (e) {
      console.log('error', e);
    }
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.leftView}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
        <View style={styles.rightView}>
          {uri && <Image source={{ uri: uri }} style={styles.image} />}
        </View>
      </View>
      <View style={styles.divider} />
    </>
  );
};

export default FoodMenuItem;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  leftView: {
    flex: 2,
  },
  itemName: {
    fontSize: 20,
  },
  itemDescription: {
    fontSize: 15,
  },
  itemPrice: {
    fontSize: 15,
  },
  rightView: {
    flex: 1,
    alignItems: 'flex-end',
  },
  image: {
    width: 100,
    height: 100,
  },
  divider: {
    borderBottomColor: 'lightgrey',
    width: '90%',
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
});
