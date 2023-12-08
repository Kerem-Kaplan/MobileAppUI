import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const EsnekVeriAlmaComponent = () => {
  const [veriler, setVeriler] = useState([]);

  const handleVeriEkle = () => {
    const yeniVeri = [...veriler, '']; // Yeni bir boş veri ekle
    setVeriler(yeniVeri);
  };

  const handleVeriDegisiklik = (text, index) => {
    const yeniVeri = [...veriler];
    yeniVeri[index] = text; // Değişen veriyi güncelle
    setVeriler(yeniVeri);
  };

  const veriGonder = () => {
    // Verileri gönderme işlemi burada gerçekleştirilebilir.
    // Örneğin: bir API'ye POST isteği yapılabilir.

    // Örnek olarak, verileri bir alert ile gösterelim:
    Alert.alert('Gönderilen Veriler', veriler.join(', '));
  };

  return (
    <View>
      {veriler.map((veri, index) => (
        <TextInput
          key={index.toString()}
          placeholder={`Veri ${index + 1}`}
          value={veri}
          onChangeText={(text) => handleVeriDegisiklik(text, index)}
        />
      ))}
      <Button title="Veri Ekle" onPress={handleVeriEkle} />
      <Button title="Verileri Gönder" onPress={veriGonder} />
    </View>
  );
};

export default EsnekVeriAlmaComponent;
