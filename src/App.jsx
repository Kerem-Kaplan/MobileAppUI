import React, {useEffect, useState} from 'react';
import Navigation from './navigation/NavigationContainer';
import {View, Text, Button} from 'react-native';
import store from './redux/store/store';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  const [isConnected, setIsConnected] = useState(true); // Bağlantı durumu
  const [initialCheckDone, setInitialCheckDone] = useState(false); // İlk bağlantı kontrolü yapıldı mı?

  const checkInternetConnection = () => {
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected);
      setInitialCheckDone(true);
    });
  };

  useEffect(() => {
    checkInternetConnection();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <Text style={{color: '#000000', fontSize: 30}}>
          İnternet bağlantısı yok!
        </Text>
        <Text style={{color: '#000000', fontSize: 30}}>
          Lütfen bağlantınızı kontrol edin ve tekrar deneyin.
        </Text>
      </View>
    );
  }

  return (
    <Provider store={store}>
      <Navigation></Navigation>
    </Provider>
  );
};

export default App;
