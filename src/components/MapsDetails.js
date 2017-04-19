import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, Image, Button } from 'react-native';
import { Actions } from "react-native-router-flux";
import MapView from 'react-native-maps';
import RealData from '../branchInfo2.json';
import Maps from './Maps.js';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 80,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    detail: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    textContainer: {
        flex: 6,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    photo: {
        flex: 1,
        height: 90,
        width: 90,
        resizeMode: 'contain'
    },
    map: {
        flex: 5,
        width: 500,
        alignItems: 'stretch'
    }
});

export default class MapsDetails extends React.Component {

    static propTypes = {
        text: React.PropTypes.number.isRequired,
    }

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{RealData[this.props.text].BranchName}</Text>
                <View style={styles.detail}>
                    <Image source={require('../asset/fp_branch_icon.png')} style={styles.photo} />
                    <View style={styles.textContainer}>
                        <Text></Text>
                        <Text>{RealData[this.props.text].Street}</Text>
                        <Text>{RealData[this.props.text].City}</Text>
                        <Text>{RealData[this.props.text].State + ' ' + RealData[this.props.text].PostalCode}</Text>
                        <Text></Text>
                        <Text>{RealData[this.props.text].Phone}</Text>
                        <Text></Text>
                        <Text>{RealData[this.props.text].Email}</Text>
                    </View>
                </View>
                <MapView
                    region={{
                        latitude: RealData[this.props.text].GeoPosition.latitude,
                        longitude: RealData[this.props.text].GeoPosition.longitude,
                        latitudeDelta: 0.0043,
                        longitudeDelta: 0.0034
                    }}
                    style={styles.map}
                >
                    <MapView.Marker
                        coordinate={RealData[this.props.text].GeoPosition}
                    />
                </MapView>
                <Button title="返回" onPress={Actions.mapslist} />
            </View>
        );
    }
}