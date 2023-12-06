import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const MenuScreen = ({navigation}) => {
  const menuItems = [
    {id: '1', title: 'Send Complaint', screen: 'Send Complaint'},
    {id: '2', title: 'Send Request', screen: 'Send Request'},
    {id: '3', title: 'Send Suggestion', screen: 'Send Suggestion'},
    {id: '4', title: 'Past Complaints', screen: 'Past Complaints'},
    {id: '5', title: 'Past Requests', screen: 'Past Requests'},
    {id: '6', title: 'Past Suggestions', screen: 'Past Suggestions'},
    {id: '7', title: 'Logout', screen: 'Login'},
  ];

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