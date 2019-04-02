import React from 'react';
import { Text, View, TouchableWithoutFeedback, ScrollView, FlatList } from 'react-native';
import { styles, screenWidth } from '../../assets/styles/style';
import { BackButton } from '../Elements/buttons';

class ListOfStopPage extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      line: navigation.getParam('line'),
      blocTitleStyle: {
        backgroundColor: navigation.getParam('line').bgColor
      },
      titleStyle: {
        color: navigation.getParam('line').color
      }
    };
  }

  toTheTimeTablePage(item) {
    const { navigation } = this.props;
    const { line } = this.state;
    navigation.navigate('TimeTablePage', { stop: item, line });
  }

  render() {
    const { navigation } = this.props;
    const { blocTitleStyle, titleStyle, line } = this.state;
    return (
      <View style={[styles.container]}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: screenWidth }}
        >
          <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#000', width: 500 }}>
            <BackButton navigation={navigation} />
          </View>
          <View style={styles.body}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                top: -25
              }}
            >
              <View
                style={[
                  styles.searchBar,
                  blocTitleStyle,
                  { alignItems: 'center', justifyContent: 'center' }
                ]}
              >
                <Text style={[titleStyle, { fontWeight: 'bold', fontSize: 18, padding: 10 }]}>
                  {line.name}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Liste des arrêts (A-Z)</Text>
            <View style={styles.resultCardBox}>
              <View style={[styles.card, styles.resultCard]}>
                <FlatList
                  style={{ flex: 1, flexDirection: 'column' }}
                  data={line.stopList.stop}
                  renderItem={({ item }) => (
                    <TouchableWithoutFeedback
                      style={styles.resultClickable}
                      onPress={() => this.toTheTimeTablePage(item)}
                    >
                      <View style={styles.resultItem}>
                        <Text style={styles.resultItemText}>{item.name}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default ListOfStopPage;
