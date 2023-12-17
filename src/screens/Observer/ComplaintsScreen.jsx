import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';

const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const complaints = [
  {
    username: 'John',
    userSurname: 'Doe',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'john@gmail.com',
    userPhoneNumber: '01111111111',
    vote: 3,
    complaintContent: {
      content1: 'Content1',
      content2: 'Content2',
    },
  },
  {
    username: 'Alvin',
    userSurname: 'Patrick',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'alvin@gmail.com',
    userPhoneNumber: '02222222222',
    vote: 2,
    complaintContent: {
      content1: 'Content3',
      content2: 'Content4',
    },
  },
  {
    username: 'Fernando',
    userSurname: 'Muslera',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'fernando@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content5',
      content2: 'Content6',
    },
  },
  {
    username: 'Erlink 1',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink1@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content7',
      content2: 'Content8',
    },
  },
  {
    username: 'Erlink',
    userSurname: 'Haaland',
    userGender: 'Male',
    userNationality: 'Turk',
    userEmail: 'erlink@gmail.com',
    userPhoneNumber: '03333333333',
    vote: 5,
    complaintContent: {
      content1: 'Content9',
      content2: 'Content10',
    },
  },
];

const ComplaintsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', margin: 10}}>
        <Text style={{color: '#000000', fontSize: 20}}>Complaints</Text>
      </View>
      <View style={styles.flatListView}>
        <FlatList
          data={complaints}
          keyExtractor={item => item.userEmail}
          renderItem={({item}) => (
            <View style={styles.flatListViewContent}>
              <View style={styles.flatListViewContentItems}>
                {Object.keys(item).map(key =>
                  key === 'complaintContent' ? (
                    ''
                  ) : (
                    <Text
                      key={key}
                      style={{
                        color: 'black',
                        marginTop: 10,
                      }}>
                      <Text key={key} style={{fontWeight: 'bold'}}>
                        {key.toUpperCase()}:
                      </Text>
                      {item[key]}
                    </Text>
                  ),
                )}
                {Object.keys(item.complaintContent).map(key => (
                  <Text
                    key={key}
                    style={{
                      color: 'black',
                      marginTop: 10,
                    }}>
                    <Text key={key} style={{fontWeight: 'bold'}}>
                      {key.toUpperCase()}:
                    </Text>
                    {item.complaintContent[key]}
                  </Text>
                ))}
              </View>
            </View>
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

  flatListView: {
    backgroundColor: '#ffffff',
    height: '100%',
    flexDirection: 'column',
    margin: 2,
  },
  flatListViewContent: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderRadius: 10,
    margin: 3,
    backgroundColor: '#ededed',
  },
  flatListViewContentItems: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    borderColor: 'black',
    margin: 5,
  },
});

export default ComplaintsScreen;
