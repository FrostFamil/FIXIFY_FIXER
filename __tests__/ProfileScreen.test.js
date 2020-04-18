import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Settings from '../src/screens/Settings';

describe('Profile screen field test', () => {

    //Unit test for Profile screen
    describe('change text of profile screen', () => {
        it('change text first last name, email, phone ', () => {
        const {getByTestId} = render(<Settings />);

        // use fireEvent change value TextInput
        fireEvent.changeText(getByTestId('fname'), 'Admin');
        fireEvent.changeText(getByTestId('lname'), 'admin');
        fireEvent.changeText(getByTestId('email'), 'admin@gmail.com');
        fireEvent.changeText(getByTestId('phone'), '1234');

        // use toEqual check value TextInput
        expect(getByTestId('fname').props.value).toEqual('Admin');
        expect(getByTestId('lname').props.value).toEqual('admin');
        expect(getByTestId('email').props.value).toEqual('admin@gmail.com');
        expect(getByTestId('phone').props.value).toEqual('1234');
        });
    });
});