import React, {useState} from 'react';
import {Modal, Text, TouchableOpacity, View, FlatList} from 'react-native';

const ModalListe = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [dataList, setDataList] = useState([
    {id: '1', text: 'Öğe 1'},
    {id: '2', text: 'Öğe 2'},
    {id: '3', text: 'Öğe 3'},
    // Liste öğelerini istediğin kadar ekle
  ]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => console.log(item.text)}>
      <Text>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 10}}>
              Liste
            </Text>
            <FlatList
              data={dataList}
              renderItem={renderItem}
              keyExtractor={item => item.id}
            />
            <TouchableOpacity
              style={{
                marginTop: 10,
                padding: 10,
                backgroundColor: 'blue',
                borderRadius: 5,
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{color: 'white', textAlign: 'center'}}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text>Liste Göster</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModalListe;
