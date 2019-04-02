import React from 'react';
import { Text, View, Image } from 'react-native';
import { styles } from '../../assets/styles/style';

const BusIcon = props => {
  const { style, lineName } = props;
  return (
    <View style={[styles.busCard, style]}>
      <Image source={require('../../assets/icons/icon_bus.png')} style={styles.busCardImgBus} />
      <Text style={styles.busCardTxt}>{lineName}</Text>
    </View>
  );
};

export default BusIcon;
