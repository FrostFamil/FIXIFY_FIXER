import React, { Component } from 'react';
import { StyleSheet, Dimensions} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button, Block, Text, Input } from '../registerComponents';
import ModalSelector from 'react-native-modal-selector';
import * as theme from '../constants/theme';
import signupRequest from '../requests/signupRequest';

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

  render() {
    const { navigation } = this.props;
    const { active } = this.state;

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: "#97387a" }} enableOnAndroid>
          <Block center style={{ marginTop: 80 }}>
            <Input
              full
              label="First name"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ firstName:text })}
            />
            <Input
              full
              label="Last name"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ lastName:text })}
            />
            <Input
              full
              email
              label="Email address"
              style={{ marginBottom: 25 }}
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
              onChangeText={(text) => this.setState({ phone:text })}
            />
            <Input
              full
              password
              label="Password"
              style={{ marginBottom: 25 }}
              onChangeText={(text) => this.setState({ password:text })}
            />
            <Text style={styles.errorTextStyle} >{this.state.error}</Text>
            <Button
              full
              style={{ marginBottom: 12, backgroundColor: '#681f51' }}
              onPress={() => this.onSubmit()}
            >
              <Text button>Create Account</Text>
            </Button>

            <Button
              full
              style={{ marginBottom: 12, backgroundColor: '#921721' }}
              onPress={() => this.props.navigation.navigate('login')}
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
