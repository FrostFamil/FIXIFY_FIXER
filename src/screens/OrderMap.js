import React, { Component } from 'react'
import { Text, StyleSheet, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native'
import MapView, {Marker} from 'react-native-maps';
import { getLocation } from '../services/location-service';
import Geocoder from 'react-native-geocoding';
import Modal from 'react-native-modal';
import * as Location from 'expo-location';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getFixersPreviousLoc, addFixersLoc, updateFixersLoc } from "../requests/updateFixersLocation";
import MapViewDirections from 'react-native-maps-directions';

const { height, width } = Dimensions.get('screen');
const LOCATION_SETTINGS = {
  accuracy: Location.Accuracy.Balanced,
  timeInterval: 10000,
  distanceInterval: 0,
};

class OrderMap extends Component {
  state = {
    activeModal: null,
    date: new Date(),
    fixerLocation: global.fixerLocation,
    postId: ''
  }

  componentDidMount() {
    Geocoder.init('AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM');
    this.getInitialState();
  }

  goBack = () => {
    this.setState({activeModal: null});
    this.props.navigation.navigate('home');
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
      fixerLocation: {
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }
    });

    const latitude = this.state.fixerLocation.latitude;
    const longitude = this.state.fixerLocation.longitude;

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
      this.setState({ fixerLocation: location.coords}, () => {
        const latitude = this.state.fixerLocation.latitude;
        const longitude = this.state.fixerLocation.longitude;
        
        updateFixersLoc(postId, global.fixerId, latitude, longitude).then(res => {
          console.log(res);  
        });
        
      })
    });
  }

  renderParking = () => {
    return (
      <TouchableWithoutFeedback >
        <View style={styles.parkings}>
        <View style={[styles.parking, styles.shadow]}>
          <View style={styles.hours}>
            <Text style={styles.hoursTitle}>{global.serviceType}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ color: '#7D818A' }}>{global.schedule}</Text>
            </View>
          </View>
          <View style={styles.parkingInfoContainer}>
            <View style={styles.parkingInfo}>
              <View style={styles.parkingIcon}>
                <Ionicons name='ios-pricetag' size={16} color='#7D818A' />
                <Text style={{ marginLeft: 12 }}> ${global.price}</Text>
              </View>
              <View style={styles.parkingIcon}>
                <Ionicons name='ios-star' size={16} color='#7D818A' />
                <Text style={{ marginLeft: 12 }}> 4.5</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buy} onPress={() => this.setState({ activeModal: true })}>
              <View style={styles.buyTotal}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.buyTotalPrice}>More</Text>
                </View>
              </View>
              <View style={styles.buyBtn}>
                <FontAwesome name='angle-right' size={16 * 1.75} color='#FFFFFF' />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderModal() {
    const { activeModal } = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        useNativeDriver
        style={styles.modalContainer}
        backdropColor='#C1BEC0'
        onBackButtonPress={() => this.setState({ activeModal: null })}
        onBackdropPress={() => this.setState({ activeModal: null })}
        onSwipeComplete={() => this.setState({ activeModal: null })}
      >
        <View style={styles.modal}>
          <View>
            <Text style={{ fontSize: 16 * 1.5 }}>
              {global.serviceType}
            </Text>
          </View>
          <View style={{ paddingVertical: 12 }}>
            <Text style={{ color: '#7D818A', fontSize: 16 * 1.1 }}>
              {global.problem}
            </Text>
          </View>
          <View style={styles.modalInfo}>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-pricetag' size={16 * 1.1} color='#7D818A' />
              <Text style={{ fontSize: 16 * 1.15 }}> ${global.price}</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-star' size={16 * 1.1} color='#7D818A' />
              <Text style={{ fontSize: 16 * 1.15 }}>4.5</Text>
            </View>
            <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
              <Ionicons name='ios-pin' size={16 * 1.1} color='#7D818A' />
              <Text style={{ fontSize: 16 * 1.15 }}>Live</Text>
            </View>
          </View>

          <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: '#A5A5A5', paddingBottom: 5 }}>Information about Customer</Text>
            </View>
            <View style={styles.profile}>
							<View style={styles.imgView}>
								<Image style={styles.img} source={require('../../assets/Icons/photo.png')} />
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>{global.userFirstName} {global.userLastName}</Text>
                <Text style={styles.email}>{global.userEmail}</Text>
							</View>
						</View>

            <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: '#A5A5A5', paddingBottom: 5 }}>Information about Request</Text>
            </View>
            <View style={{flexDirection: "row", bottom: 5}}>
               <Text style={{fontSize: 15, color: 'red'}}>Scheduled for: </Text>
               <Text>{global.schedule}</Text>
            </View>
            <View style={{ flexDirection: 'row', bottom: 5}}> 
              <Text style={{ fontSize: 15, color: 'red'}}>Payment method: </Text>
              <Text>{global.payment}</Text>
            </View>
            <View style={{ flexDirection: 'row', bottom: 5}}> 
               <Text style={{ fontSize: 15, color: 'red'}}>Address: </Text>
               <Text>{global.address}</Text>
          </View>

          <View>
            <TouchableOpacity style={styles.payBtn} onPress={() => this.goBack()}>
              <Text style={styles.payText}>
                Finish Request
              </Text>
              <FontAwesome name='angle-right' size={16 * 1.75} color='#FFFFFF' />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render() {

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
        >
          <Marker coordinate={this.state.fixerLocation}>
            <View style={styles.myMarker}>
              <View style={styles.myMarkerDot} />
            </View>
          </Marker>

          <Marker coordinate={{latitude: parseFloat(global.userLocLat), longitude: parseFloat(global.userLocLng)}}>
            <MaterialCommunityIcons name="home-circle" size={27}/>
          </Marker>

          <MapViewDirections
            origin={this.state.fixerLocation ? this.state.fixerLocation:global.fixerLocation}
            destination={{latitude: parseFloat(global.userLocLat), longitude: parseFloat(global.userLocLng)}}
            apikey={'AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM'}
            strokeWidth={3}
            strokeColor="blue"
          />

        </MapView>
        {this.renderParking()}
        {this.renderModal()}
      </View>
    )
  }
}

export default OrderMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
  },
  map: {
    flex: 3,
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 12 * 2,
  },
  parking: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    padding: 12,
    marginHorizontal: 12 * 2,
    width: width - (24 * 2),
  },
  buy: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 12* 1.5,
    paddingVertical: 12,
    backgroundColor: '#D83C54',
    borderRadius: 6,
  },
  buyTotal: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  buyTotalPrice: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingLeft: 12 / 4,
  },
  buyBtn: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  shadow: {
    shadowColor: '#3D4448',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  hours: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 12 / 2,
    justifyContent: 'space-evenly',
  },
  hoursTitle: {
    fontSize: 12,
    fontWeight: '500',
  },
  parkingInfoContainer: { flex: 1.5, flexDirection: 'row' },
  parkingInfo: {
    justifyContent: 'space-evenly',
    marginHorizontal: 12 * 1.5,
  },
  parkingIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    flexDirection: 'column',
    height: height * 0.63,
    padding: 12 * 2,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalInfo: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#C1BEC0',
    borderBottomColor: '#C1BEC0',
  },
  modalHours: {
    paddingVertical: height * 0.11,
  },
  modalHoursDropdown: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12 * 1.5,
    backgroundColor: '#D83C54',
  },
  payText: {
    fontWeight: '600',
    fontSize: 12 * 1.5,
    color: '#FFFFFF',
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)'
  },
  myMarkerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB'
  },
  profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
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
  profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
  },
  name: {
		fontSize: 20,
		paddingBottom: 1,
		color: 'black',
		textAlign: 'left',
  },
  email: {
    fontSize: 13,
		color: 'black',
		textAlign: 'left',
  },
})
