import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, FlatList, Text, StyleSheet, Animated} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowDown,
  faCircleUser,
  faArchive,
  faLink,
  faSearchPlus,
  faPlusCircle,
  faCartPlus,
  faCirclePlus,
  faFileCirclePlus,
  faFolder,
  faFolderPlus,
  faFileArchive,
  faBrain,
  faHistory,
  faDoorOpen,
  faComment,
  faReply,
  faPen,
  faInbox,
  faCodePullRequest,
  faDrumSteelpan,
  faEllipsisV,
  faLeftLong,
  faCompressAlt,
  faHome,
  faTableList,
  faClipboard,
  faUser,
  faDoor,
} from '@fortawesome/free-solid-svg-icons';
import {removeToken} from '../../helpers/tokens';
import {
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const MenuScreen = () => {
  const navigation = useNavigation();

  const menuItems = [
    {
      id: '1',
      title: 'Add Complaint Detail',
      onPress: () => {
        navigation.navigate('AddComplaintDetail');
      },
      icon: faCirclePlus,
    },
    {
      id: '2',
      title: 'Add Request Detail',
      onPress: () => {
        navigation.navigate('AddRequestDetail');
      },
      icon: faFolderPlus,
    },
    {
      id: '3',
      title: 'Add Suggestion Detail',
      onPress: () => {
        navigation.navigate('AddSuggestionDetail');
      },
      icon: faSearchPlus,
    },
    {
      id: '4',
      title: 'Complaints',
      onPress: () => {
        navigation.navigate('Complaints');
      },
      icon: faArchive,
    },
    {
      id: '5',
      title: 'Requests',
      onPress: () => {
        navigation.navigate('Requests');
      },
      icon: faComment,
    },
    {
      id: '6',
      title: 'Suggestions',
      onPress: () => {
        navigation.navigate('Suggestions');
      },
      icon: faPen,
    },
    {
      id: '7',
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
          <View style={[styles.menuItem]}>
            <FontAwesomeIcon icon={item.icon} color={'#000000'} size={20} />
            <Text style={styles.menuItemText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      style={{marginTop: 30}}
      data={menuItems}
      keyExtractor={menuItems.id}
      renderItem={renderMenuItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 2,
  },
  menuItem: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 5,
    color: '#000000',
  },
});

export default MenuScreen;
