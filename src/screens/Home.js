import React, { Component } from "react";
import {View,Text, Alert, Dimensions, AsyncStorage} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'
import { getLocation } from '../services/location-service';
import Geocoder from 'react-native-geocoding';
import {MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import RequestList from '../mocks/RequestList';
import {profileRequest} from '../requests/profileRequest';
import {StackActions, NavigationActions} from 'react-navigation';
import { getFixersPreviousLoc, addFixersLoc, updateFixersLoc } from "../requests/updateFixersLocation";
import * as Location from 'expo-location';
import fixerAcceptRequest from "../requests/fixerAcceptRequest";
import {pushNotification} from '../requests/pushNotification';
import getPushTokens from "../requests/getPushTokens";
import sendPushNotification from "../requests/sendPushNotification";

const { width, height } = Dimensions.get('screen');

const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 10000,
  distanceInterval: 0,
};

export default class Home extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <MaterialCommunityIcons name="bell" size={27} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>Requests</Text>  
      ),
    }
  }

  state = {
    userStartLocation: null,
    postId: ''
  }

  componentDidMount = async() => {
    Geocoder.init('AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM');
    this.getInitialState();
    
    profileRequest(global.fixerId).then(res => {
      global.fName = res.firstName;
      global.email = res.email;
      global.lName = res.lastName;
      global.serviceType = res.status; 
    });

    let previousToken = await AsyncStorage.getItem('fixerPushToken');

    console.log(previousToken);

    if (previousToken){
      return;
    }else{
    let {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);

    if ( status !== 'granted' ){
      return;
    }

    let token = await Notifications.getExpoPushTokenAsync();
    AsyncStorage.setItem('fixerPushToken', token);
    
    pushNotification(token, global.fName, global.lName, global.serviceType).then(res => {
      console.log(res);    
    })
    }
  }
  

  getInitialState() {
    getLocation().then(data => {
      this.updateState({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    });
  }

  updateState(location) {
    this.setState({
      userStartLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }
    });

    const latitude = this.state.userStartLocation.latitude;
    const longitude = this.state.userStartLocation.longitude;

    getFixersPreviousLoc(global.fixerId).then(res => {
      if(res.postId){
        this.setState({ postId: res.postId._id }, () => {
          const {postId} = this.state;
          this.updateUsersLocationDynamically(postId);
        });
      }else{
        addFixersLoc(latitude, longitude, global.fixerId).then(res => {
          this.setState({postId: res.postId}, () => {
            const {postId} = this.state;
            this.updateUsersLocationDynamically(postId);
          })
        })
      }
    })

  }

  updateUsersLocationDynamically = (postId) => {

    Location.watchPositionAsync(LOCATION_SETTINGS, location => {
      this.setState({ userStartLocation: location.coords}, () => {
        const latitude = this.state.userStartLocation.latitude;
        const longitude = this.state.userStartLocation.longitude;
        
        updateFixersLoc(postId, global.fixerId, latitude, longitude).then(res => {
          console.log(res);  
        });
        
      })
    });
  }

  openMapInfo = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to accept request ?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => this.acceptPressed()},
      ],
      {cancelable: false},
    );

    global.fixerLocation = this.state.userStartLocation;
  }

  acceptPressed = () => {
    fixerAcceptRequest(global.requestIndex, global.fixerId).then(res => {
      
      const userId = res.request.creator;
      getPushTokens(userId).then(res => {
        var to = res.tokens[0].token;
        const title = "Request Accepted";
        const body = "Your Request Accepted";

        sendPushNotification(to, title, body).then(res => {
          console.log(res);       
        })
      })

      this.props.navigation.navigate('successOrder');
      
    })
  }

 /* locPressed = () => {
    navigator.geolocation.getCurrentPosition(position => {
       this.setState({
          userStartLocation: {
             latitude: position.coords.latitude,
             longitude: position.coords.longitude,
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421
          }
         });
      }, err => console.log(err));

      console.log(this.state.userStartLocation);
      
  };*/

  logOutPressed = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'First' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: 'white'}}>Requests</Title>
          </Body>
          <Right style={{ right: 5}}>
            <Entypo name="log-out" size={22} onPress={()=> this.logOutPressed()} style={{ color: 'white' }} />
          </Right>
        </Header>
        <RequestList mapInfo={() => this.openMapInfo()} />
      </View>
    );
  }
}

const styles = {
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.15,
    paddingHorizontal: 14,
  },
  location: {
    height: 24,
    width: 24,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF7657',
  },
  settings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    flex: 1,
    paddingHorizontal: 14,
  }
}