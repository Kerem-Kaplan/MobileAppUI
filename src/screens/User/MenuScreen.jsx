import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {removeToken} from '../../helpers/tokens';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArchive,
  faDoorOpen,
  faComment,
  faPen,
} from '@fortawesome/free-solid-svg-icons';

const MenuScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: '1',
      title: 'Past Complaints',

      onPress: () => {
        navigation.navigate('PastComplaints');
      },
      icon: faArchive,
    },
    {
      id: '2',
      title: 'Past Requests',
      onPress: () => {
        navigation.navigate('PastRequests');
      },
      icon: faComment,
    },
    {
      id: '3',
      title: 'Past Suggestions',
      onPress: () => {
        navigation.navigate('PastSuggestions');
      },
      icon: faPen,
    },
    {
      id: '4',
      title: 'Log Out',
      onPress: async () => {
        navigation.navigate('Login');
        await removeToken();
      },
      icon: faDoorOpen,
    },
  ];

  const renderMenuItem = ({item}) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={item.onPress}>
          <View style={styles.menuItem}>
            <FontAwesomeIcon icon={item.icon} color={'#000000'} size={20} />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    color: '#000000',
    marginLeft: 5,
  },
});

export default MenuScreen;
