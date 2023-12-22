import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MenuScreen = () => {
  const menuItems = [
    {id: '1', title: 'Add Complaint Detail', screen: 'Add Complaint Detail'},
    {id: '2', title: 'Add Request Detail', screen: 'Add Request Detail'},
    {id: '3', title: 'Add Suggestion Detail', screen: 'Add Suggestion Detail'},
    {id: '4', title: 'Complaints', screen: 'Complaints'},
    {id: '5', title: 'Requests', screen: 'Requests'},
    {id: '6', title: 'Suggestions', screen: 'Suggestions'},
  ];

  const navigation = useNavigation();

  const renderMenuItem = ({item}) => {
    return (
      <View style={styles.container}>
        <View style={styles.menuItem}>
          <TouchableOpacity onPress={() => navigation.navigate(item.screen)}>
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <FlatList
        style={{marginTop: 30}}
        data={menuItems}
        keyExtractor={menuItems.id}
        renderItem={renderMenuItem}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
  },
});

export default MenuScreen;
