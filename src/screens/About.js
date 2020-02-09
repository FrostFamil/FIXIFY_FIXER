import React, { Component } from "react";
import {View,Text} from "react-native";
import {Header, Left, Icon, Body, Title} from 'native-base';
import { CardSection } from '../components';
import {Entypo} from '@expo/vector-icons';

export default class About extends Component {

  static navigationOptions = ({navigation}) => {
    const {state} = navigation;

    return {
      drawerIcon: () => (
        <Entypo name="info-with-circle" size={25} style={{ color: 'black' }} />
      ),
      drawerLabel: () => (
        <Text style={{ color: 'black', fontSize: 20 }}>About</Text>  
      ),
    }
  }

  render() {
    return (
      <View>
        <Header style={{ backgroundColor: "#97387a"}}>
          <Left style={{ left: 5}}>
            <Icon  name='menu' onPress={() => this.props.navigation.openDrawer()} style={{ color: 'white'}} />
          </Left>
          <Body style={{ right: 90}}>
            <Title style={{ color: 'white'}}>About</Title>
          </Body>
        </Header>
        
        <CardSection>
        <Text
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          style={{ fontSize: 18 }}
          multiline = {true}
        >Here Will Be Text About Us</Text>
       </CardSection>

      </View>
    );
  }
}