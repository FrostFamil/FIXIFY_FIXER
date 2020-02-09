import React, { Component } from "react";
import { Text, StyleSheet, Image, View, ScrollView } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from "react-navigation-stack";

import Login from './Login';
import Register from './Register';
import Home from './Home';
import Orders from './Orders';
import Settings from './Settings';
import About from './About';
import Support from './Support';
import SuccessfullOrderScreen from "./SuccesfullOrderScreen";
import OrderMap from "./OrderMap";



const drawerScreen = createDrawerNavigator({
  home: { screen: Home },
  orders: { screen: Orders },
  settings: { screen: Settings },
  about: { screen: About },
  support: { screen: Support }
}, {
  contentComponent: (props) => (
    <View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
								<Image style={styles.img} source={require('../../assets/Icons/photo.png')} />
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>{global.fName} {global.lName}</Text>
  								<Text style={styles.email}>{global.email}</Text>
							</View>
						</View>
					</View>
					<View style={styles.bottomLinks}>
						<DrawerItems {...props} />
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.description}>FIXIFY</Text>
					<Text style={styles.version}>fixer</Text>
				</View>
			</View>
  )
})

const AppNavigator = createStackNavigator({
	First: {
		screen: createBottomTabNavigator({
			login: { screen: Login, navigationOptions: { tabBarVisible: false }},
			register: { screen: Register, navigationOptions: { tabBarVisible: false }},
			main: {
			  navigationOptions: { tabBarVisible: false },
			  screen: createBottomTabNavigator({
				services: {
				  navigationOptions: { tabBarVisible: false },
				  screen: drawerScreen
				},
				successOrder: { screen: SuccessfullOrderScreen, navigationOptions: { tabBarVisible: false }},
				orderMap: { screen: OrderMap, navigationOptions: { tabBarVisible: false }}
			  }, {
				swipeEnabled: false
			  })
			}
		  }, {
			lazy: true,
			tabBarVisible: false
		  }),
		  navigationOptions: { gesturesEnabled: false } 
	}
}, {
	headerMode: 'none'
});


const AppContainer = createAppContainer(AppNavigator);

class AppNavigation extends Component {
  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

const styles = StyleSheet.create({
  container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 1,
		color: 'white',
		textAlign: 'left',
  },
  email: {
    fontSize: 13,
		color: 'white',
		textAlign: 'left',
  },
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 20,
	},
	topLinks:{
		height: 160,
		backgroundColor: 'black',
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1, 
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1, 
		marginLeft: 20,
		fontSize: 16,
	}
})

export default AppNavigation;
