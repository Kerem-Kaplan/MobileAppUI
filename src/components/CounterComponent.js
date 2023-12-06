import React from 'react';
import {View, Text, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement, incrementByAmount} from '../redux/slice/slice'; // counterSlice'ın yolu

const CounterComponent = () => {
  const count = useSelector(state => state.counter.count);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleIncrementByAmount = () => {
    dispatch(incrementByAmount(5)); // Örnek olarak 5 değeri ile arttırabiliriz.
  };

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button title="Increment" onPress={handleIncrement} />
      <Button title="Decrement" onPress={handleDecrement} />
      <Button title="Increment by 5" onPress={handleIncrementByAmount} />
    </View>
  );
};

export default CounterComponent;
