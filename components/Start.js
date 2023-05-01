import React from 'react'
import { StyleSheet, Text, View, Button, Modal } from 'react-native'

const Start = (props) => {
    return (
        <Modal visible={props.startScreen}>
            <View style={styles.container}>
             <Text style={styles.title}>Flick Master</Text>
             <Button 
             title='ゲームを開始' 
             onPress={props.toFalseStartScreen}
             />   
            </View>
            
        </Modal>
    )
}

export default Start

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
    },
    title:{
        fontSize:36,
    }
})
