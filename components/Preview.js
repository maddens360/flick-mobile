import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Preview = (props) => {
    const typable = props.typable.split('');
    // const user = props.userInput.split('');
    if(!props.finished){
        return (
            <Text style={styles.words}>
                {
                    typable.map((s, i) => {
                        let color;
                        if (
                          (i === props.userInput.length &&
                          !(typable[i-1] !== props.userInput[i-1]) ||
                          i === props.userInput.length-1)
                        ) {
                          color = "rgba(63, 125, 255, 0.2)";
                        }
                        if (i < props.userInput.length) {
                            if(s === props.userInput[i]){
                                color="#dfffa0";
                            } else if(i === props.userInput.length &&
                          !(typable[i-1] !== props.userInput[i-1]) ||
                          i === props.userInput.length-1){
                        color = "rgba(63, 125, 255, 0.2)";
                            } else if(typable[i] !== props.userInput[i]){
                        color = "#fcbea4";
                            }
                        }
                        return (
                            <Text key={i} style={{ backgroundColor: color }}>{s}</Text>   
                        )
    
                    })
                }
            </Text>
        )
    }else{return null}
}

const styles = StyleSheet.create({
    words: {
        fontSize:20,
        marginBottom:8,
    }
})
export default Preview;