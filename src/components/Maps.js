import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, Button, Platform, Modal, TouchableHighlight } from 'react-native';
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

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: Platform.OS === 'ios' ? 64 : 54 }}>
                {/*<Modal
                    animationType={"slide"}
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => { alert("Modal has been closed.") }}
                >
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <Text>Hello World!</Text>

                            <TouchableHighlight onPress={() => {
                                this.setModalVisible(!this.state.modalVisible)
                            }}>
                                <Text>Hide Modal</Text>
                            </TouchableHighlight>

                        </View>
                    </View>
                </Modal>

                <TouchableHighlight onPress={() => {
                    this.setModalVisible(true)
                }}>
                    <Text>Show Modal</Text>
                </TouchableHighlight>*/}
                <Button
                    onPress={() => this.buttonPressed()}
                    title="顯示全部"
                />
                <MapView
                    ref={ref => { this.map = ref; }}
                    region={this.state.region}
                    style={styles.map}
                >
                    {this.state.markers.map(marker => (
                        <MapView.Marker
                            key={marker.Id}
                            coordinate={marker.GeoPosition}
                            title={marker.BranchName}
                            description={`${marker.Street} ${marker.City} ${marker.PostalCode}`}
                            onCalloutPress={() => this.calloutPressed(marker.GeoPosition)}
                            liteMode={true}
                        />
                    ))}
                </MapView>
                <Button title="返回" onPress={() => Actions.pop} />
            </View>
        );
    }
}

export default Maps;