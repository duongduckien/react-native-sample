import React, { useState } from 'react';
import { View } from 'react-native';
import { getCurrentLocation } from 'react-native-demo-module';
import styles from './styles';

// Components
import TextView from '../../components/TextView';
import ButtonView from '../../components/ButtonView';

const CustomModule = () => {
  const [coordinate, setCoordinate] = useState({ lat: 0, long: 0 });

  const handleCurrentLocation = async () => {
    try {
      const res = await getCurrentLocation();
      setCoordinate({
        lat: parseFloat(res[0]),
        long: parseFloat(res[1]),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.valueSection}>
        <TextView text={`Latitude: ${coordinate.lat}, Longitude: ${coordinate.long}`} />
      </View>

      <ButtonView
        text={'Detect location'}
        onPress={handleCurrentLocation}
      />
    </View>
  );
};

export default CustomModule;
