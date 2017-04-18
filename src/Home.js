import React, { Component } from 'react';
import { AppRegistry, View, ListView, StyleSheet, Text } from 'react-native';
import { Scene, Router, Actions } from 'react-native-router-flux';
import MapsDetails from './components/MapsDetails';
import Maps from './components/Maps';
import MapsList from './components/MapsList';

class Home extends React.Component {
    render() {
        return (<Router>
            <Scene key="root">
                <Scene key="mapsdetails" component={MapsDetails} getTitle={this.props.title} />
                <Scene key="maps" component={Maps} title="分社地圖" initial={true} onRight={() => Actions.mapslist()}
                    rightTitle="清單" />
                <Scene key="mapslist" component={MapsList} title="營業據點" initial={false} />
            </Scene>
        </Router>);
    }
}

AppRegistry.registerComponent('MapList', () => Home);