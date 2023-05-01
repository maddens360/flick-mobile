import React from 'react';
import Proptypes from 'prop-types';
import {View} from 'react-native';


class Delayed extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hidden: true };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ hidden: false });
        }, this.props.waitBeforeShow);
    }
    render() {
        if(this.state.hidden){
            return null;
        }else{
            return( 
                <View>{this.props.children}</View>
            )
        }
    }
}

Delayed.propTypes = {
    waitBeforeShow: Proptypes.number.isRequired
};

export default Delayed;