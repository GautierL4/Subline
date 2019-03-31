import React from 'react';
import { Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { styles, screenWidth, screenHeight } from '../../assets/styles/style';
import FileLoader from './FileLoader.js';
import BusIcon from '../Elements/BusIcon'

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
        }
    }

    /**
     * Load the icon associated with this section.
     *
     * @param {object} section
     * @returns {function} The icon.
     * @memberof PartOfJourney
     */
    loadIcon(section) {
        let icon = IconLoader.getIconBySection(section);
        return icon;
    }

    /**
     * Formats date to 'hh:mm'.
     *
     * @param {String} dateFromResponse
     * @returns {String} Formatted date.
     * @memberof PartOfJourney
     */
    getHoursFromISO(dateFromResponse) {
        var hours = dateFromResponse.split("T");
        var hoursTab = hours[1].split("");
        var formatHours = hoursTab[0] + hoursTab[1] + ":" + hoursTab[2] + hoursTab[3];
        return formatHours;
    }

    /**
     * Convert seconds to minutes.
     *
     * @param {number} seconds
     * @returns {number} minutes.
     * @memberof PartOfJourney
     */
    convertSecondsToMinutes(seconds) {
        var minutes = Math.floor(seconds / 60);
        return minutes;
    }

    /**
     * Toggle the display of dropdown.
     *
     * @memberof PartOfJourney
     */
    toggleDisplayStopAreas() {
        var value = this.state.showOrHideDropDown.display == 'none' ? 'flex' : 'none'
        this.setState({
            showOrHideDropDown: {
                display: value,
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
        if (this.props.sectionData.stop_date_times) {
            return (
                <View style={{ flexDirection: 'column' }}>
                    <TouchableOpacity onPress={() => this.toggleDisplayStopAreas()} style={{ flexDirection: 'row', marginTop: 10, height: 30, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontWeight: 'bold', color: '#898989', fontSize: 14 }}>{this.props.sectionData.stop_date_times.length} arrêts</Text>
                        <Image style={{ width: 7, height: 7, marginLeft: 5 }} source={require('../../assets/icons/sort-down-grey.png')} />
                    </TouchableOpacity>
                    <View style={[this.state.showOrHideDropDown, { marginLeft: 10, marginRight: 10 }]}>
                        <FlatList style={{ flex: 1 }} listKey={(item, index) => index.toString()} data={this.props.sectionData.stop_date_times} renderItem={({ item }) => {
                            return (
                                <View style={{ marginTop: 2, paddingBottom: 2 }}>
                                    <Text style={{ fontSize: 14, color: "#898989" }}>{item.stop_point.name}</Text>
                                </View>
                            )
                        }
                        } keyExtractor={(item, index) => index.toString()} />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View></View>
            )
        }
    }

    /**
     * Display the part of journey.
     *
     * @returns
     * @memberof PartOfJourney
     */
    render() {
        if (this.props.sectionData.type == "waiting") {
            return (
                <View></View>
            )
        }
        else if (this.props.sectionData.type == "public_transport") {
            return (
                <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                        {(this.props.sectionData.display_informations !== undefined && (this.props.sectionData.display_informations.physical_mode === 'Bus' || this.props.sectionData.display_informations.commercial_mode === 'Bus')) ?
                            <BusIcon lineName={this.props.sectionData.display_informations.label} style={{ height: 25 }} />
                            :
                            <Image style={{ height: 25, width: 25 }} source={this.loadIcon(this.props.sectionData)} />
                        }
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.departure_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.from.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/arrow-direction.png')} />
                                <Text style={{ fontSize: 12, color: "#898989", marginLeft: 5 }}>{this.props.sectionData.display_informations.direction}</Text>
                            </View>
                        </View>
                    </View>
                    {this.displayAllStops()}
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.arrival_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.to.name}</Text>
                        </View>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={{ flexDirection: 'column', marginRight: 20, marginLeft: 20, paddingBottom: 20 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
                        <Image style={{ height: 25, width: 25 }} source={this.loadIcon(this.props.sectionData)} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.departure_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.from.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Image style={{ width: 12, height: 12 }} source={require('../../assets/icons/arrow-direction.png')} />
                                <Text style={{ fontSize: 12, color: "#898989", marginLeft: 5 }}>{this.props.sectionData.to.name}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                        <Text style={{ fontSize: 22, color: "#898989", flex: 1 }}>{this.getHoursFromISO(this.props.sectionData.arrival_date_time)}</Text>
                        <View style={{ flexDirection: 'column', flex: 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{this.props.sectionData.to.name}</Text>
                        </View>
                    </View>
                </View>
            )
        }
    }

}
export default PartOfJourney;