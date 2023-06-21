import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import styles from './styles';

// Components
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';

// Actions
import { increaseRequest } from './actions';

const Home = () => {
  const dispatch = useDispatch();

  const { loading, number } = useSelector((store: any) => store.home);

  const handleOnPress = () => {
    dispatch(increaseRequest(number));
  };

  return (
    <View style={styles.container}>
      <View style={styles.valueSection}>
        <TextView text={`The number is: ${number}`} />
      </View>

      <ButtonView
        text={'Increase'}
        loading={loading}
        onPress={handleOnPress}
      />
    </View>
  );
};

export default Home;
