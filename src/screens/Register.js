import React, { Component } from 'react';
import { StyleSheet, Dimensions, View, Image, Linking} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Block, Text, Input } from '../registerComponents';
import ModalSelector from 'react-native-modal-selector';
import * as theme from '../constants/theme';
import signupRequest from '../requests/signupRequest';
import * as Google from 'expo-google-app-auth';

const { width, height } = Dimensions.get('screen');

const statusData = [{status: 'Technology'}, {status: 'Plumber'}, {status: 'Furniture'}, {status: 'Household'}, {status: 'Electric'}, {status: 'Auto'}];

class Register extends Component {
  state = {
    active: null,
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    error: '',
    status: ''
  }

  handleType = id => {
    const { active } = this.state;
    this.setState({ active: active === id ? null : id });
  }

  onSubmit = () => {

    const { email, password, firstName, lastName, status, phone} = this.state;

    if(firstName === '' || email === '' || password === '' || lastName === '' || phone === ''){
      this.setState({ error: "Please fill all fields"});
    }else {
      signupRequest(email, password, firstName, lastName, status, phone).then(res => {
        if(res) {   
          this.props.navigation.navigate('login');
        }else{
          this.setState({ loading: false });
          this.setState({ error: "Please fill all fields"});
        }
      })
    }
  }

  signInGoogle = async () => {
    try {
      const result = await Google.logInAsync({
        iosClientId: "2731587920-ee511en33tjbhq798o64uhqlfnml7rsr.apps.googleusercontent.com",
        androidClientId: "2731587920-atovhpab512pf0s406q3dcae1i1bhpcn.apps.googleusercontent.com",
        androidStandaloneAppClientId: "2731587920-atovhpab512pf0s406q3dcae1i1bhpcn.apps.googleusercontent.com", 
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          firstName: result.user.givenName,
          lastName: result.user.familyName,
          email: result.user.email,
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }

  signInFacebook = async() => {
    /*try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('1124417461088636', {
        permissions: ['public_profile', 'email'],
        behavior: 'web',
      });
      if (type === 'success') {
        const result = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,first_name,email,last_name,picture.type(small)`).then(res => res.json());
        this.setState({
          facebook_data: {
            first_name:result.first_name,
            last_name: result.last_name,
            email: result.email,
            provider: 'facebook',
            provider_id: result.id,
            avatar: result.picture.data.url,
            provider_token: token,
            password: token
          }
        })
        this.props.signUpFacebook(this.state.facebook_data);
        
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }*/
    Linking.openURL('https://www.facebook.com/');
}

  cancelPressed = () => {
    this.setState({ firstName: '', lastName: '', email: '', phone: '', password: ''});
    this.props.navigation.navigate('login');
  }

  render() {
    const { navigation } = this.props;
    const { active } = this.state;

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#97387a" }} enableOnAndroid>
          <Block center style={{ marginTop: 60 }}>
            <Input
              full
              label="First name"
              style={{ marginBottom: 25 }}
              value={this.state.firstName}
              onChangeText={(text) => this.setState({ firstName:text })}
            />
            <Input
              full
              label="Last name"
              style={{ marginBottom: 25 }}
              value={this.state.lastName}
              onChangeText={(text) => this.setState({ lastName:text })}
            />
            <Input
              full
              email
              label="Email address"
              style={{ marginBottom: 25 }}
              value={this.state.email}
              onChangeText={(text) => this.setState({ email:text })}
            />
            <ModalSelector
                data={statusData}
                initValue="Choose What Service You Offer"
                keyExtractor={key => key.status}
                labelExtractor= {item => item.status}
                accessible={true}
                scrollViewAccessibilityLabel={'Scrollable options'}
                cancelButtonAccessibilityLabel={'Cancel Button'}
                onChange={(option) => this.setState({ status: option.status })}>
                <Input
                  full
                  label="Service Type"
                  style={{ marginBottom: 25 }}
                  value={this.state.status}
                />
            </ModalSelector>
            <Input
              full
              keyboardType='phone-pad'
              label="Mobile number"
              style={{ marginBottom: 25 }}
              value={this.state.phone}
              onChangeText={(text) => this.setState({ phone:text })}
            />
            <Input
              full
              password
              label="Password"
              style={{ marginBottom: 25 }}
              value={this.state.password}
              onChangeText={(text) => this.setState({ password:text })}
            />
            <Text style={styles.errorTextStyle} >{this.state.error}</Text>
            <Button
              full
              style={{ marginBottom: 5, backgroundColor: '#681f51' }}
              onPress={() => this.onSubmit()}
            >
              <Text button>Create Account</Text>
            </Button>

            <View style={{ flexDirection: 'row' }}>
              <Button style={{backgroundColor: 'white'}} onPress={() => this.signInGoogle()} >
                <Image
                  style={{ width: 100, height: 55, borderRadius: 20 }}
                  source={require('../../assets/UsedPhotos/google.jpg')}
                />
              </Button>

              <Button style={{marginLeft: 10, backgroundColor: '#97387a'}} onPress={() => this.signInFacebook()} >
                <Image
                  style={{ width: 100, height: 55, borderRadius: 5 }}
                  source={require('../../assets/UsedPhotos/facebook.png')}
                />
              </Button>
            </View>

            <Button
              full
              style={{ marginTop: 5, backgroundColor: '#921721' }}
              onPress={() => this.cancelPressed()}
            >
              <Text button>Cancel</Text>
            </Button>
          </Block>
      </KeyboardAwareScrollView>
    )
  }
}

export default Register;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
  },
  active: {
    borderColor: theme.colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: theme.colors.lightblue,
    shadowRadius: 3,
    shadowOpacity: 1,
  },
  icon: {
    flex: 0,
    height: 48,
    width: 48,
    borderRadius: 48,
    marginBottom: 15,
    backgroundColor: theme.colors.lightblue
  },
  check: {
    position: 'absolute',
    right: -9,
    top: -9,
  },
  errorTextStyle: {
    fontSize: 18,
    color: 'red'
  },
  button: {
    borderRadius: 4,
    height: 55,
    paddingVertical: 11,
    alignItems: 'center',
    justifyContent: 'center',
    width: width-50,
    backgroundColor: 'white'
  }
})
