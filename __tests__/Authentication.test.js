import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Login from '../src/screens/Login';
import Register from '../src/screens/Register';

describe('Authentication field test', () => {

  //Unit test for Login screen
  describe('change text login screen', () => {
    it('change text email and password', () => {
      const {getByTestId} = render(<Login />);

      // use fireEvent change value TextInput
      fireEvent.changeText(getByTestId('email'), 'admin@gmail.com');
      fireEvent.changeText(getByTestId('password'), 'admin');

      // use toEqual check value TextInput
      expect(getByTestId('email').props.value).toEqual('admin@gmail.com');
      expect(getByTestId('password').props.value).toEqual('admin');
    });
    
  });

  //Unit test for Register screen
  describe('change text register screen', () => {
    it('change text email, password, first last name, phone ', () => {
      const {getByTestId} = render(<Register />);

      // use fireEvent change value TextInput
      fireEvent.changeText(getByTestId('email'), 'admin@gmail.com');
      fireEvent.changeText(getByTestId('password'), 'admin');
      fireEvent.changeText(getByTestId('fname'), 'admin');
      fireEvent.changeText(getByTestId('lname'), 'admin');
      fireEvent.changeText(getByTestId('phone'), '12345678');

      // use toEqual check value TextInput
      expect(getByTestId('email').props.value).toEqual('admin@gmail.com');
      expect(getByTestId('password').props.value).toEqual('admin');
      expect(getByTestId('fname').props.value).toEqual('admin');
      expect(getByTestId('lname').props.value).toEqual('admin');
      expect(getByTestId('phone').props.value).toEqual('12345678');
    });
  });
});