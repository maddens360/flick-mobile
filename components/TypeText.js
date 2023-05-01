import React from 'react'
import { StyleSheet, TextInput} from 'react-native'

const TypeText = (props) => {
    if(!props.finished){
        return (
            <TextInput
                autoFocus={true}
                value={props.userInput}
                onChange={props.onUserInputChange}
                style={styles.input}
                placeholder="入力で開始"
                // textChange={input => this.setState({input})}
                // input={this.state.userInput}
                // onKeyPress={e => {
                //     if(e.keyCode === 'Backspace'){
                //         
                //         
                //     }else{console.log(alert(e.keyCode))}
                // }}
                onKeyPress={({ nativeEvent }) => {
                    if(nativeEvent.key === 'Backspace'){
                        props.backspace();
                    }
                }}
            />
        )
    }
    else{return null}
}

const styles = StyleSheet.create({
    inputContainer: { 
        flexDirection:'row',
        justifyContent:'space-between',
        shadowOffset:{width:0,height:3},
        shadowColor:'#171717',
        shadowOpacity:.1
    },
    input: {
        backgroundColor: '#F3F3F3',
        height: 45,
        width: 300,
        textAlign:'center'
    },
})

export default TypeText;