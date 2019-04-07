import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import FileLoader from './FileLoader';
import BusIcon from '../Elements/BusIcon';

const IconLoader = new FileLoader();

/**
 * Class representing a part of a journey
 *
 * @class PartOfJourney
 * @extends {React.Component}
 */
class PartOfJourney extends React.Component {
  /**
   * Creates an instance of PartOfJourney.
   *
   * @memberof PartOfJourney
   */
  constructor() {
    super();
    this.state = {
      showOrHideDropDown: {
        display: 'none'
      }
    };
  }

  /**
   * Formats date to 'hh:mm'.
   *
   * @param {String} dateFromResponse
   * @returns {String} Formatted date.
   * @memberof PartOfJourney
   */
  getHoursFromISO(dateFromResponse) {
    const hours = dateFromResponse.split('T');
    const hoursTab = hours[1].split('');
    const formatHours = `${hoursTab[0] + hoursTab[1]}:${hoursTab[2]}${hoursTab[3]}`;
    return formatHours;
  }

  /**
   * Load the icon associated with this section.
   *
   * @param {object} section
   * @returns {function} The icon.
   * @memberof PartOfJourney
   */
  loadIcon(section) {
    const icon = IconLoader.getIconBySection(section);
    return icon;
  }

  /**
   * Convert seconds to minutes.
   *
   * @param {number} seconds
   * @returns {number} minutes.
   * @memberof PartOfJourney
   */
  convertSecondsToMinutes(seconds) {
    const minutes = Math.floor(seconds / 60);
    return minutes;
  }

  /**
   * Toggle the display of dropdown.
   *
   * @memberof PartOfJourney
   */
  toggleDisplayStopAreas() {
    const { showOrHideDropDown } = this.state;
    const value = showOrHideDropDown.display === 'none' ? 'flex' : 'none';
    this.setState({
      showOrHideDropDown: {
        display: value
      }
    });
  }

  /**
   *
   *
   * @returns
   * @memberof PartOfJourney
   */
  displayAllStops() {
    const { sectionData } = this.props;
    const { showOrHideDropDown } = this.state;
    if (sectionData.stop_date_times) {
      return (
        <View style={{ flexDirection: 'column' }}>
          <TouchableOpacity
            onPress={() => this.toggleDisplayStopAreas()}
            style={{
              flexDirection: 'row',
              marginTop: 10,
              height: 30,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#898989', fontSize: 14 }}>
              {sectionData.stop_date_times.length} arrêts
            </Text>
            <Image
              style={{ width: 7, height: 7, marginLeft: 5 }}
              source={require('../../assets/icons/sort-down-grey.png')}
            />
          </TouchableOpacity>
          <View style={[showOrHideDropDown, { marginLeft: 10, marginRight: 10 }]}>
            <FlatList
              style={{ flex: 1 }}
              listKey={(item, index) => index.toString()}
              data={sectionData.stop_date_times}
              renderItem={({ item }) => {
                return (
                  <View style={{ marginTop: 2, paddingBottom: 2 }}>
                    <Text style={{ fontSize: 14, color: '#898989' }}>{item.stop_point.name}</Text>
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      );
    }
    return <View />;
  }

  /**
   * Display the part of journey.
   *
   * @returns
   * @memberof PartOfJourney
   */
  render() {
    const { sectionData } = this.props;
    if (sectionData.type === 'waiting') {
      return <View />;
    }
    if (sectionData.type === 'public_transport') {
      return (
        <View
          style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20 }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: 20
            }}
          >
            {sectionData.display_informations !== undefined &&
            (sectionData.display_informations.physical_mode === 'Bus' ||
              sectionData.display_informations.commercial_mode === 'Bus') ? (
              <BusIcon lineName={sectionData.display_informations.label} style={{ height: 25 }} />
            ) : (
              <Image style={{ height: 25, width: 25 }} source={this.loadIcon(sectionData)} />
            )}
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Text style={{ fontSize: 22, color: '#898989', flex: 1 }}>
              {this.getHoursFromISO(sectionData.departure_date_time)}
            </Text>
            <View style={{ flexDirection: 'column', flex: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sectionData.from.name}</Text>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
              >
                <Image
                  style={{ width: 12, height: 12 }}
                  source={require('../../assets/icons/arrow-direction.png')}
                />
                <Text style={{ fontSize: 12, color: '#898989', marginLeft: 5 }}>
                  {sectionData.display_informations.direction}
                </Text>
              </View>
            </View>
          </View>
          {this.displayAllStops()}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 10,
              justifyContent: 'flex-start',
              alignItems: 'center'
            }}
          >
            <Text style={{ fontSize: 22, color: '#898989', flex: 1 }}>
              {this.getHoursFromISO(sectionData.arrival_date_time)}
            </Text>
            <View style={{ flexDirection: 'column', flex: 3 }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sectionData.to.name}</Text>
            </View>
          </View>
        </View>
      );
    }
    return (
      <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginTop: 20
          }}
        >
          <Image style={{ height: 25, width: 25 }} source={this.loadIcon(sectionData)} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'flex-start'
          }}
        >
          <Text style={{ fontSize: 22, color: '#898989', flex: 1 }}>
            {this.getHoursFromISO(sectionData.departure_date_time)}
          </Text>
          <View style={{ flexDirection: 'column', flex: 3 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sectionData.from.name}</Text>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
              <Image
                style={{ width: 12, height: 12 }}
                source={require('../../assets/icons/arrow-direction.png')}
              />
              <Text style={{ fontSize: 12, color: '#898989', marginLeft: 5 }}>
                {sectionData.to.name}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 10,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Text style={{ fontSize: 22, color: '#898989', flex: 1 }}>
            {this.getHoursFromISO(sectionData.arrival_date_time)}
          </Text>
          <View style={{ flexDirection: 'column', flex: 3 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{sectionData.to.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default PartOfJourney;
