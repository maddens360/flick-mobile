import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Dimensions} from 'react-native';

const { height } = Dimensions.get('window')

const animationEndY = Math.ceil(height * 0.7);
const negativeEndY = animationEndY * -1;

const HeartContainer = (props) => {
    const [position, setPosition] = useState(new Animated.Value(0));
    const [yAnimation, setYAnimation] = useState(new Animated.Value(0));
    const [opacityAnimation, setOpactiyAnimation] = useState(new Animated.Value(0));
    const [scaleAnimation, setScaleAnimation] = useState(new Animated.Value(0));
    // static defaultProps = {
    //   onComplete(){}
    // }

    useEffect(() => {
        const yAnimation = position.interpolate({
            inputRange: [negativeEndY*0.15, 0],
            outputRange: [animationEndY, 0]
        });
        setYAnimation(yAnimation);

        const opacityAnimation = yAnimation.interpolate({
            inputRange: [0, animationEndY],
            outputRange: [1, 0]
        });
        setOpactiyAnimation(opacityAnimation);

        const scaleAnimation = yAnimation.interpolate({
            inputRange: [0, 15, 30],
            outputRange: [1, 1.4, 1],
            extrapolate: 'clamp'
        });
        setScaleAnimation(scaleAnimation);


        Animated.timing(position, {
            duration: 2000,
            toValue: negativeEndY,
            easing: Easing.ease,
            useNativeDriver: true
        }).start(props.onComplete);
    }, []);

    const getHeartStyle = () => {
        return {
            transform: [{ translateY: position }, { scale: scaleAnimation }],
            opacity: opacityAnimation
        };
    }

    return (
        <Animated.View style={[styles.heartContainer, getHeartStyle(), props.style]}>
            <Heart color="purple" bonus={props.bonus}/>
        </Animated.View>
    )
} 
const Heart = (props) => {
    return (
        <View {...props} style={[styles.heart, props.style]}>
            <Text style={{color:`${props.color}`, fontSize:24, textAlign:'center'}}>+{props.bonus}</Text>
        </View>
    )
}

export default HeartContainer;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    // heartContainer: {
    //     position: 'absolute',
    //     bottom: -100,
    //     backgroundColor: 'transparent',
    // },
    heart: {
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        textAlign:'center',
    }
})