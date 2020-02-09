import React, { Component } from 'react';
import { Text, View, ScrollView, FlatList, Dimensions, ImageBackground, TouchableOpacity } from 'react-native';
import { FontAwesome, SimpleLineIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import fixerGetRelatedRequests from "../requests/fixerGetRelatedRequests";
import fixerSeeRequest from '../requests/fixerSeeRequest';

const { width, height } = Dimensions.get('screen');

class RequestList extends Component {
    state = {
        activeModal: null,
        relatedRequests: [],
        requestIndex: '',
        problem: ''
      }


    refreshPressed = () => {

      fixerGetRelatedRequests(global.serviceType).then(res => {
        this.setState({ relatedRequests: res.requests}); 
      });
      
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
                    <Text style={{ fontSize: 16 * 1.15 }}> $15</Text>
                </View>
                <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
                    <Ionicons name='ios-star' size={16 * 1.1} color='#7D818A' />
                    <Text style={{ fontSize: 16 * 1.15 }}>4.5</Text>
                </View>
                <View style={[styles.parkingIcon, {justifyContent: 'flex-start'} ]}>
                    <Ionicons name='ios-pin' size={16 * 1.1} color='#7D818A' />
                    <Text style={{ fontSize: 16 * 1.15 }}> 20km</Text>
                </View>
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
          this.setState({problem: res.request.problem});
          global.problem = res.request.problem;
          global.userLocLat = res.request.latitudeFrom;
          global.userLocLng = res.request.longitudeFrom;
        });
      });
    }

    render() {
      return (
        <ScrollView>
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
                      {item.status}
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.serviceInfo}>
                        <MaterialCommunityIcons name="cash" color="black" size={23} />
                        <Text style={{ marginLeft: 4, color: '#FFBA5A' }}>100</Text>
                    </View>
                    <View style={styles.serviceInfo}>
                    <FontAwesome name="location-arrow" color="#FF7657" size={12} />
                    <Text style={{ marginLeft: 4, color: '#FF7657' }}>
                        20 km
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
    height: height * 0.75,
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
  }
};


export default RequestList;
