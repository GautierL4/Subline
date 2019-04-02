import React from 'react';
import { Text, View, Image, ScrollView, FlatList } from 'react-native';
import { styles, screenWidth } from '../../assets/styles/style';
import PartOfJourney from './PartOfJourney';
import { BackButton, FavoriteButton } from '../Elements/buttons';

/**
 * Class representing the page of a specific journey
 *
 * @class JourneyPage
 * @extends {React.Component}
 */
class JourneyPage extends React.Component {
  /**
   * Creates an instance of JourneyPage.
   *
   * @param {*} props
   * @memberof JourneyPage
   */
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.journeyData = navigation.getParam('journeyData');
  }

  /**
   * Convert seconds to minutes.
   *
   * @param {number} seconds
   * @returns {number} minutes.
   * @memberof JourneyPage
   */
  convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    return minutes;
  }

  /**
   * Round the number depending of the precision.
   *
   * @param {number} value
   * @param {number} precision
   * @returns {number} New value, the rounded number.
   * @memberof JourneyPage
   */
  roundDecimal(value, precision) {
    const tmp = 10 ** (precision || 2);
    return Math.round(value * tmp) / tmp;
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ width: screenWidth }}
        >
          <View style={styles.header}>
            <View style={{ flexDirection: 'row', height: 80, justifyContent: 'center' }}>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <BackButton navigation={navigation} />
              </View>
              <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
                <FavoriteButton dataJourney={this.journeyData} />
                {/* <AlarmButton /> */}
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff', fontSize: 70, fontWeight: 'bold' }}>
                {this.convertSecondsToMinutes(this.journeyData.duration)}
              </Text>
              <Text style={{ color: '#ffffff', fontSize: 30, marginTop: 30 }}>min</Text>
            </View>
          </View>
          <View style={styles.body}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                top: -15
              }}
            >
              <View
                style={[
                  styles.card,
                  {
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection: 'row'
                  }
                ]}
              >
                <Image
                  style={{ width: 17, height: 17 }}
                  source={require('../../assets/icons/walk.png')}
                />
                <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>
                  {`${this.convertSecondsToMinutes(this.journeyData.durations.walking)} min`}
                </Text>
              </View>
              <View
                style={[
                  styles.card,
                  {
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    flexDirection: 'row',
                    marginLeft: 10
                  }
                ]}
              >
                <Image
                  style={{ width: 17, height: 17 }}
                  source={require('../../assets/icons/carbon-dioxide.png')}
                />
                <Text style={{ color: '#000', fontSize: 14, fontWeight: 'bold', marginLeft: 5 }}>
                  {`${this.roundDecimal(this.journeyData.co2_emission.value, 2)} ${
                    this.journeyData.co2_emission.unit
                  }`}
                </Text>
              </View>
            </View>
            <Text style={styles.title}>Itinéraire</Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 50
              }}
            >
              <View style={[styles.card, { flex: 0.9, flexDirection: 'column' }]}>
                <FlatList
                  data={this.journeyData.sections}
                  ItemSeparatorComponent={() => (
                    <View
                      style={{
                        borderBottomColor: '#e5e5e5',
                        borderBottomWidth: 1,
                        marginLeft: 20,
                        marginRight: 20
                      }}
                    />
                  )}
                  renderItem={({ item }) => {
                    return <PartOfJourney sectionData={item} />;
                  }}
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
export default JourneyPage;
