import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, Button, Platform } from 'react-native';
import { Actions } from "react-native-router-flux";
import MapView from 'react-native-maps';
import RealData from '../branchInfo2.json';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "#F5FCFF",
    },
    map: {
        //...StyleSheet.absoluteFillObject,
        flex: 1,
    },
});

const INIT_REGION = {
    latitude: 22.6671459,
    longitude: 120.3180793,
    latitudeDelta: 0.155,
    longitudeDelta: 0.151,
};
const ZOOM_LATITUDE_DELTA = 0.0043;
const ZOOM_LONGITUDE_DELTA = 0.0034;

class Maps extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: INIT_REGION,
            markers: RealData,
            modalVisible: false,
        };

    }

    calloutPressed(pos) {
        this.map.animateToRegion({
            latitude: pos.latitude,
            longitude: pos.longitude,
            latitudeDelta: ZOOM_LATITUDE_DELTA,
            longitudeDelta: ZOOM_LONGITUDE_DELTA,
        });
    }

    buttonPressed() {
        this.map.animateToRegion(INIT_REGION);
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 64 : 54 }}>
                <Button
                    onPress={() => this.buttonPressed()}
                    title="顯示全部"
                />
                <MapView
                    ref={ref => { this.map = ref; }}
                    region={this.state.region}
                    style={styles.map}
                    liteMode={true}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker.Id}
                            coordinate={marker.GeoPosition}
                            onCalloutPress={() => this.calloutPressed(marker.GeoPosition)}
                        >
                            <MapView.Callout style={{ width: 140, height: 110 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{marker.BranchName}</Text>
                                <Text selectable>{`${marker.Street}\n${marker.City}\n${marker.State}${marker.PostalCode}\n${marker.Phone}\n${marker.Email}`}</Text>
                            </MapView.Callout>
                        </MapView.Marker>
                    ))}
                </MapView>
                <Button title="返回" onPress={() => Actions.pop} />
            </View>
        );
    }
}

export default Maps;