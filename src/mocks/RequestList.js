import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Input } from '../registerComponents';
import Modal from 'react-native-modal';
import * as geolib from 'geolib';
import fixerGetRelatedRequests from "../requests/fixerGetRelatedRequests";
import fixerSeeRequest from '../requests/fixerSeeRequest';
import { getUserProfileRequest } from '../requests/profileRequest';
import fixerSetPrice from '../requests/fixerSetPrice';
import getPushTokens from "../requests/getPushTokens";
import sendPushNotification from "../requests/sendPushNotification";
import fixerGetPendingRequests from '../requests/fixerGetPendingRequest';

const { width, height } = Dimensions.get('screen');

class RequestList extends Component {
    state = {
        activeModal: null,
        relatedRequests: [],
        pendingRequests: [],
        requestIndex: '',
        problem: '',   
        creator: '',
        customerFirstName: '',
        customerLastName: '',
        customerEmail: '',
        schedule: '',
        payment: '',
        address: '',
        price: '',
        purposedPrice: ''
      }


    refreshPressed = () => {

      fixerGetRelatedRequests(global.serviceType).then(res => {
        this.setState({ relatedRequests: res.requests}); 
      });
      
      const acceptor = global.fixerId;

      fixerGetPendingRequests(acceptor).then(res => {
        this.setState({ pendingRequests: res.requests});  
      })
    }

    purposePrice = () => {
      const {requestIndex, purposedPrice} = this.state;
      const price = purposedPrice;

      fixerSetPrice(requestIndex, price, global.fixerId).then(res => {
        console.log(res);

        this.setState({ purposedPrice: '' });
        const userId = this.state.creator;
        getPushTokens(userId).then(res => {
          var to = res.tokens[0].token;
          const title = "Price Setted";
          const body = "Price Setted For Your Request";

          sendPushNotification(to, title, body).then(res => {
            console.log(res);       
          })
        })
        
      })
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
                    {this.state.problem}
                </Text>
                </View>
                <View style={styles.modalInfo}>
                <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
                    <Ionicons name='ios-pricetag' size={16 * 1.1} color='#7D818A' />
                    <Text style={{ fontSize: 16 * 1.15 }}> ${this.state.price}</Text>
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
								    <Text style={styles.name}>{this.state.customerFirstName} {this.state.customerLastName}</Text>
                    <Text style={styles.email}>{this.state.customerEmail}</Text>
                  </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15, color: '#A5A5A5', paddingBottom: 5 }}>Information about Request</Text>
                </View>
                <View style={{flexDirection: "row", bottom: 5}}>
                  <Text style={{fontSize: 15, color: 'red'}}>Scheduled for: </Text>
                  <Text>{this.state.schedule}</Text>
                </View>
                <View style={{ flexDirection: 'row', bottom: 5}}> 
                  <Text style={{ fontSize: 15, color: 'red'}}>Payment method: </Text>
                  <Text>{this.state.payment}</Text>
                </View>
                <View style={{ flexDirection: 'row', bottom: 5}}> 
                  <Text style={{ fontSize: 15, color: 'red'}}>Address: </Text>
                  <Text>{this.state.address}</Text>
              </View>
              <View style={{ flexDirection: 'row', bottom: 5}}> 
                  <Text style={{ fontSize: 15, color: 'red'}}>Calculated Price for Distance: </Text>
                  <Text>{this.state.roadPrice}$</Text>
              </View>

              <View>
                <Input
                  full
                  keyboardType='phone-pad'
                  label="Mobile number"
                  style={{ marginBottom: 5, color: 'black' }}
                  value={this.state.purposedPrice}
                  onChangeText={(text) => this.setState({ purposedPrice:text })}
                />
                <TouchableOpacity style={styles.payBtn} onPress={() => this.purposePrice()}>
                  <Text style={styles.payText}>
                    Purpose Price
                  </Text>
                  <FontAwesome name='angle-right' size={16 * 1.75} color='#FFFFFF' />
                </TouchableOpacity>
              </View>
            </View>
            </Modal>
        );
        }
    
    openDetails = (requestIndex) => {

      this.setState({ requestIndex: requestIndex, activeModal: true }, () => {

        const {requestIndex} = this.state;
        global.requestIndex = requestIndex;

        fixerSeeRequest(requestIndex).then(res => {
          this.setState({problem: res.request.problem, creator: res.request.creator, schedule: res.request.scheduled, payment: res.request.paymentType, address: res.request.address, price: res.request.price}, () => {
            const userId = this.state.creator;

            const roadPrice = (geolib.getDistance(global.fixerLocation, { latitude: parseFloat(res.request.latitudeFrom), longitude: parseFloat(res.request.longitudeFrom)}, 1000)/1000 * 10 * 1.4 / 2).toString();
            this.setState({ roadPrice: roadPrice });

            getUserProfileRequest(userId).then(res => {
              this.setState({ customerFirstName: res.firstName, customerLastName: res.lastName, customerEmail: res.email});
              global.userFirstName = res.firstName;
              global.userLastName = res.lastName;
              global.userEmail = res.email;
            })
          });
          global.problem = res.request.problem;
          global.userLocLat = res.request.latitudeFrom;
          global.userLocLng = res.request.longitudeFrom;
          global.schedule = res.request.scheduled;
          global.payment = res.request.paymentType;
          global.address = res.request.address;
          global.price = res.request.price;
        });
      });
    }

    render() {
      return (
        <ScrollView>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 15, color: '#A5A5A5', paddingBottom: 5 }}>New Requests</Text>
            </View>
            {
            this.state.relatedRequests ?
            <FlatList
              id={this.props.orderIndex}
              data={this.state.relatedRequests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item} ) => (
                <View style={styles.services}>
                <ImageBackground
                    style={styles.serviceImage}
                    imageStyle={styles.serviceImage}
                    source={require('../../assets/Icons/history.png')}
                />
                <View style={styles.serviceDetails}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                      {item.serviceType}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>
                      {item.problem}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.serviceInfo}>
                        <MaterialCommunityIcons name="cash" color="black" size={23} />
                        <Text style={{ marginLeft: 4, color: '#FFBA5A' }}>{item.paymentType}</Text>
                    </View>
                    <View style={styles.serviceInfo}>
                    <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                    <Text style={{ marginLeft: 4, color: '#FF7657' }}>
                        Live
                    </Text>
                    </View>
                </View>
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <TouchableOpacity onPress={(this.props.mapInfo)}>
                 <SimpleLineIcons name="check" color="#A5A5A5" size={24} />
                </TouchableOpacity>

                <TouchableOpacity style={{top: 10}} onPress={() => this.openDetails(item._id)}>
                 <SimpleLineIcons name="info" color="#A5A5A5" size={24} />
                </TouchableOpacity>
                </View>
            </View>)}
            />:null
          }

          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 15, color: '#A5A5A5', paddingBottom: 5 }}>Pending Requests</Text>
          </View>
          {
            this.state.pendingRequests ?
            <FlatList
              id={this.props.orderIndex}
              data={this.state.pendingRequests}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item} ) => (
                <View style={styles.services}>
                <ImageBackground
                    style={styles.serviceImage}
                    imageStyle={styles.serviceImage}
                    source={require('../../assets/Icons/history.png')}
                />
                <View style={styles.serviceDetails}>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                      {item.serviceType}
                    </Text>
                    <Text style={{ fontSize: 12, color: '#A5A5A5', paddingTop: 5 }}>
                      {item.problem}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.serviceInfo}>
                        <MaterialCommunityIcons name="cash" color="black" size={23} />
                        <Text style={{ marginLeft: 4, color: '#FFBA5A' }}>{item.paymentType}</Text>
                    </View>
                    <View style={styles.serviceInfo}>
                    <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                    <Text style={{ marginLeft: 4, color: '#FF7657' }}>
                        Live
                    </Text>
                    </View>
                </View>
                </View>
                <View style={{ flex: 0.3, justifyContent: 'center' }}>
                <TouchableOpacity onPress={(this.props.mapInfo)}>
                 <SimpleLineIcons name="check" color="#A5A5A5" size={24} />
                </TouchableOpacity>

                <TouchableOpacity style={{top: 10}} onPress={() => this.openDetails(item._id)}>
                 <SimpleLineIcons name="info" color="#A5A5A5" size={24} />
                </TouchableOpacity>
                </View>
            </View>)}
            />:null
          }
      <View style={{ top: 4, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => this.refreshPressed()}>
          <SimpleLineIcons name="refresh" color="#A5A5A5" size={35} />
        </TouchableOpacity>
      </View>
      {this.renderModal()}
    </ScrollView>
    );
  }
}

const styles = {
  ImageIconStyle: {
    padding: 0,
    margin: 5,
    height: 60,
    width: 60,
    resizeMode: 'stretch',
  },
  services: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#A5A5A5',
    borderBottomWidth: 0.5,
    padding: 20,
    paddingTop: 3
  },
  serviceDetails: {
    flex: 2,
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 14,
  },
  serviceImage: {
    width: width * 0.30,
    height: width * 0.25,
    borderRadius: 6,
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
  payBtn: {
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12 * 1.5,
    backgroundColor: '#D83C54',
  },
};


export default RequestList;
