import React, { Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';

export default class Fetch extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Fetch'
        }
    };
    state = {
        list: null
    }
    showList(jsonList){
        return (
            
        )
    }
}