import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const imageWidth = width / 3;

const suggestions = [
  {
    observerName: 'İşletme 1',
    subject: 'Example Subject1',
    demands: {
      suggDe: 'Detaillllllllllll',
      dateRequest: '9.12.2023',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
  {
    observerName: 'İşletme 3',
    subject: 'Example Subject1',
    demands: {
      dateRequest: '9.12.2023',
      place: 'Place',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
  {
    observerName: 'İşletme 2',
    subject: 'Example Subject1',
    demands: {
      date: '9.12.2023',
      time: 'Time 2',
      detail:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    },
  },
];
const PastSuggestionScreen = () => {
  return (
    <View style={styles.flatListView}>
      <FlatList
        data={suggestions}
        keyExtractor={item => item.observerName}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              borderWidth: 1,
              borderRadius: 25,
              margin: 3,
              backgroundColor: '#bdffc7',
            }}>
            <View
              style={{
                alignItems: 'flex-start',
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
                {Object.keys(item).map(key =>
                  key === 'demands' ? (
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
                {Object.keys(item.demands).map(key => (
                  <Text
                    key={key}
                    style={{
                      color: 'black',
                      marginTop: 10,
                    }}>
                    <Text key={key} style={{fontWeight: 'bold'}}>
                      {key.toUpperCase()}:
                    </Text>
                    {item.demands[key]}
                  </Text>
                ))}
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  margin: 2,
                }}>
                <Image
                  source={require('../../assets/appIcon.png')}
                  style={{
                    width: imageWidth / 1.2,
                    height: imageWidth / 1.2,
                    margin: '5%',
                    borderRadius: imageWidth / 20,
                  }}></Image>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: '100%',
    flexDirection: 'column',
  },
  selectedCategory: {
    backgroundColor: '#93a994',
  },
});
export default PastSuggestionScreen;
