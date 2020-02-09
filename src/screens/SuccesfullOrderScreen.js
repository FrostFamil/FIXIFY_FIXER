import React, { Component } from "react";
import {Text, ImageBackground} from "react-native";
import { View, Button } from "native-base";
import {RippleLoader } from 'react-native-indicator';
import styles from "../constants/styles";

class SuccessfullOrderScreen extends Component {

	state = {
	  driverFound: this.props.word
	}

    componentDidMount() {
	  this.interval = setInterval(() => this.setState({ driverFound: this.props.word }), 5000);
	}

	componentWillUnmount() {
	  clearInterval(this.interval);
	}

	backPressed= () => {
		this.props.navigation.navigate("orderMap");
	}

  render() {
    return (
  		<View style={styles.findDriverContainer} >
			<ImageBackground source={require('../../assets/UsedPhotos/order.png')} style={{width: '100%', height: '100%'}}>
				<View style={styles.content}>
					<RippleLoader style={styles.spinner} isVisible size={50} color="#ffffff"/>
					<Text style={styles.tabText}>Dear</Text>
					<Text style={styles.text}>{global.fName} {global.lName}</Text>
					<Text style={styles.subText}>Your request accepting was successfull!</Text>
					<View style={{ top: 20}}>
						<Button style={styles.cancelBtn} onPress={this.backPressed}>
							<Text style={styles.cancelBtnText}>Map</Text>
						</Button>
					</View>
				</View>
			</ImageBackground>
  		</View>
  	);
  }
}

export default  SuccessfullOrderScreen;
