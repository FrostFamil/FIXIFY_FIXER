import React, { Component } from "react";
import {View,Text} from "react-native";
import {Header, Left, Icon, Body, Title, Right} from 'native-base';
import {Ionicons, FontAwesome} from '@expo/vector-icons';
import OrderList from '../mocks/OrderList';
import { fixerAddFinishedRequestToHistory } from "../requests/fixerFinishRequest";

export default class Orders extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <Ionicons name="ios-time" size={29} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>History</Text>  
      ),
    }
  }

  state = {
    oldOrders: []
  }

  componentDidMount() {
    this.refreshPressed();
  }

  openMapDetails = () => {
    this.props.navigation.navigate('orderMap');
  }

  refreshPressed = () => {
    const acceptor = global.fixerId;

    fixerAddFinishedRequestToHistory(acceptor).then(res => {
      this.setState({oldOrders: res.requests});
    })
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ flex: 1 }}>
            <Title style={{ color: 'white'}}>History</Title>
          </Body>
          <Right style={{ right: 5}}>
            <FontAwesome onPress={() => this.refreshPressed()} name='refresh' style={{ color: 'white', fontSize: 25}} />
          </Right>
        </Header>
        
        <OrderList oldOrders={this.state.oldOrders} details={() => this.openMapDetails()} />
      </View>
    );
  }
}