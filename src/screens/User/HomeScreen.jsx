import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import {tokens} from '../../constants/tokens';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const categories = [
  {id: 1, name: 'Ulaşım'},
  {id: 2, name: 'Gıda'},
  {id: 3, name: 'Giyim'},
  {id: 4, name: 'Kategori-4'},
  {id: 5, name: 'Kategori-5'},
  {id: 6, name: 'Kategori-6'},
  {id: 7, name: 'Kategori-7'},
  {id: 8, name: 'Kategori-8'},
  {id: 9, name: 'Kategori-9'},
];

const businesses = [
  {
    id: 1,
    observerName: 'İşletme 1',
    email: 'isletme1@gmail.com',
    phoneNumber: '01111111',
    address: 'Address İşletme 1',
    voteAverage: 1.5,
    categoryId: 1,
  },
  {
    id: 2,
    observerName: 'İşletme 2',
    email: 'isletme2@gmail.com',
    phoneNumber: '02222222',
    address: 'Address İşletme 2',
    voteAverage: 3.9,
    categoryId: 1,
  },
  {
    id: 3,
    observerName: 'İşletme 3',
    email: 'isletme3@gmail.com',
    phoneNumber: '03333333',
    address: 'Address İşletme 3',
    voteAverage: 2.3,
    categoryId: 2,
  },
  {
    id: 4,
    observerName: 'İşletme 4',
    email: 'isletme4@gmail.com',
    phoneNumber: '04444444',
    address: 'Address İşletme 4',
    voteAverage: 4.1,
    categoryId: 2,
  },
  {
    id: 5,
    observerName: 'İşletme 5',
    email: 'isletme5@gmail.com',
    phoneNumber: '05555555',
    address: 'Address İşletme 5',
    voteAverage: 3.5,
    categoryId: 3,
  },
  {
    id: 6,
    observerName: 'İşletme 6',
    email: 'isletme6@gmail.com',
    phoneNumber: '06666666',
    address: 'Address İşletme 6',
    voteAverage: 4.7,
    categoryId: 3,
  },
];

const url = 'http://192.168.1.10:3000/user/homepage';

const HomeScreen = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = React.useState(1);
  const [observers, setObservers] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getObservers();
  }, []);

  const getObservers = async () => {
    try {
      const response = await axios.get(url);
      console.log('response', response.data.observers.observers);
      setObservers(response.data.observers.observers);
      setCategories(response.data.categories.categories);

      console.log('response', response.data.categories.categories);
      console.log(typeof categories);
      return;
    } catch (error) {
      console.log('Error', error.response.data);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryScrollView}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category._id}
              style={[
                styles.categoryItem,
                selectedCategory === category._id
                  ? styles.selectedCategory
                  : null,
              ]}
              onPress={() => setSelectedCategory(category._id)}>
              <Text style={styles.categoryText}>
                {category.observerCategory}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={observers.filter(
            observers => observers.observerCategory === selectedCategory,
          )}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  borderWidth: 1,
                  borderRadius: 10,
                  margin: 3,
                  backgroundColor: '#d2f4d2',
                }}>
                <View
                  style={{
                    alignItems: 'center',
                    margin: 5,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      borderColor: 'black',
                      margin: 5,
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Observer Name :</Text>
                      {item.observerName}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Email :</Text>{' '}
                      {item.email}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Phone Number :</Text>
                      {item.phoneNumber}
                    </Text>
                    <Text
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Address :</Text>
                      {item.address}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 2,
                      borderLeftWidth: 2,
                    }}>
                    <Image
                      source={require('../../assets/appIcon.png')}
                      style={{
                        width: imageWidth / 1.5,
                        height: imageWidth / 1.5,
                        margin: '5%',
                        borderRadius: imageWidth / 5,
                      }}
                    />
                    <View>
                      <Text style={{color: '#000000'}}>
                        <Text style={{fontWeight: 'bold'}}>
                          Oy Ortalaması :
                        </Text>{' '}
                        {item.voteAverage} / 5
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    margin: 5,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      backgroundColor: '#ffa8a8',
                      borderWidth: 1,
                      borderRadius: 10,
                      height: height / 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                      color: '#000000',
                    }}
                    onPress={() => {
                      navigation.navigate('Send Complaint');
                    }}>
                    <Text style={{color: '#000000', fontWeight: '500'}}>
                      Send Complaint
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      backgroundColor: '#9fbca7',
                      borderRadius: 10,
                      borderWidth: 1,
                      height: height / 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                      color: '#000000',
                    }}
                    onPress={() => {
                      navigation.navigate('Send Request');
                    }}>
                    <Text style={{color: '#000000', fontWeight: '500'}}>
                      Send Request
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      backgroundColor: '#addaff',
                      borderRadius: 10,
                      borderWidth: 1,
                      height: height / 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: 5,
                      color: '#000000',
                    }}
                    onPress={() => {
                      navigation.navigate('Send Suggestion');
                    }}>
                    <Text style={{color: '#000000', fontWeight: '500'}}>
                      Send Suggestion
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  categoryScrollView: {
    height: '8.5%',
    backgroundColor: '#c3d5c8',
    borderBottomWidth: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  categoryItem: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 1,
    marginHorizontal: 3,
    backgroundColor: '#94e696',
  },
  categoryText: {
    color: '#000000',
    fontSize: imageWidth / 11,
  },
  flatListView: {
    backgroundColor: '#ffffff',
    height: '91.5%',
    flexDirection: 'column',
  },
  selectedCategory: {
    backgroundColor: '#93a994',
  },
});
export default HomeScreen;
