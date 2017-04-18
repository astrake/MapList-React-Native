import React, { Component } from 'react';
import { View, ListView, StyleSheet, Text, Platform, TouchableHighlight, Image } from 'react-native';
import { Actions } from "react-native-router-flux"
import SearchBar from 'react-native-searchbar'
import haversine from 'haversine'

import RealData from '../branchInfo2.json'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
        padding: 12,
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    photo: {
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
});
const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class MapsList extends React.Component {
    constructor(props) {
        super(props);

        this.results = RealData;
        this.state = {
            dataSource: ds.cloneWithRows(this.results),
            usrPosition: {
                latitude: 22.6671459,
                longitude: 120.3180793
            },
            error: null,
        };
        this._handleSearch = this._handleSearch.bind(this);
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    usrPosition: position.coords,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    _handleSearch(input) {
        var searchResults = [];
        RealData.map((dataRow) => {
            if (dataRow.BranchName.includes(input)) {
                searchResults.push(dataRow);
            }
        });
        this.setState({ dataSource: ds.cloneWithRows(searchResults) });
    }

    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableHighlight onPress={() => Actions.mapsdetails({ text: rowData.Id - 1, title: rowData.BranchName })} style={{ height: 80 }}>
                <View style={styles.container}>
                    <Image source={require('../asset/fp_branch_icon.png')} style={styles.photo} />
                    <View style={styles.textContainer}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {`${rowData.BranchName}`}
                        </Text>
                        <Text style={{ fontSize: 20, color: 'gray' }}>
                            {`${rowData.Service}`}
                        </Text>
                        <Text style={{ fontSize: 18, color: 'red' }}>
                            {haversine(rowData.GeoPosition, this.state.usrPosition, { unit: 'km' }).toFixed(2) + '公里'}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{ marginTop: 40 }}>
                <SearchBar
                    ref={(ref) => this.searchBar = ref}
                    data={RealData}
                    handleSearch={this._handleSearch}
                    showOnLoad={true}
                    allDataOnEmptySearch={true}
                    hideBack={true} // hide back button
                />
                {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    style={{ marginTop: 80 }}
                    keyboardDismissMode={'on-drag'}
                />
            </View>
        );
    }
}

export default MapsList;