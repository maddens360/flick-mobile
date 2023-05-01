import React from 'react';
import { StyleSheet, View } from 'react-native';

export default (props) => {
    return (
        <>
            {/* <View style={styles.myProgress}>
                <View style={[styles.enemyBar, myBar(props.enemyHealth)]}>
                </View>
            </View> */}
            <View style={styles.myProgress}>
                <View style={[styles.myBar, myBar(props.myHealth)]}>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    myProgress: {
        width: 200,
        backgroundColor: 'lightgrey',
        marginTop: 2,
    },
    myBar: {
        height: 30,
        backgroundColor: '#ffea59',
        alignSelf: 'stretch',
        // textAlign:'center',

    },
    enemyBar: {
        height: 30,
        backgroundColor: 'red',
    }
})

const myBar = function (myHealth) {
    return {
        width: myHealth
    }
}
const enemyBar = function (enemyHealth) {
    return {
        width: enemyHealth
    }
}