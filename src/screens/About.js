import React, { Component } from "react";
import {View,Text, Image} from "react-native";
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

        <View style={{ alignItems: 'center', marginTop: 10}}>
          <Image 
            source={require('../../assets/UsedPhotos/Information.jpg')}
            style={{ width: 200, height: 200, borderRadius: 20}}
          />
        </View>
        
        <CardSection>
        <Text
          {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
          style={{ fontSize: 20 }}
          multiline = {true}
        >FIXIFY is a service application which aims to ease ordering of repairers. With the help of this application users will able to order fixers almost for any services.
        Also, fixers will also able to get into technological world where they can able to access and accept projects from anywhere easily with only using their phones.</Text>
       </CardSection>

      </View>
    );
  }
}