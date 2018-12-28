import React from 'react';
import { StyleSheet, Text, View, Image, Animated, TextInput, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableOpacity, ScrollView, Dimensions, FlatList } from 'react-native';
import { styles } from '../../assets/styles/style';
import APIHandler from '../API/APIHandler.js';
import { BackButton } from '../Elements/buttons'


class TimeTablePage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <ScrollView horizontal={false} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flexDirection: 'row', height: 100, backgroundColor: '#000', width: 500 }}>
                        <BackButton navigation={this.props.navigation} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
export default TimeTablePage;