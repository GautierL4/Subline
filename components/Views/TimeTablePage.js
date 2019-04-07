import React from 'react';
import { View, ScrollView } from 'react-native';
import { styles } from '../../assets/styles/style';
import { BackButton } from '../Elements/buttons';

const TimeTablePage = props => {
  const { navigation } = props;
  return (
    <View style={styles.container}>
      <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#000', width: 500 }}>
          <BackButton navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TimeTablePage;
