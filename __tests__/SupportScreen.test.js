import React from 'react';
import {render, fireEvent} from 'react-native-testing-library';
import Support from '../src/screens/Support';

describe('Support screen field test', () => {

    //Unit test for Support screen
    describe('change text of support screen', () => {
        it('change text full name, email, problem ', () => {
        const {getByTestId} = render(<Support />);

        // use fireEvent change value TextInput
        fireEvent.changeText(getByTestId('fullName'), 'Admin admin');
        fireEvent.changeText(getByTestId('email'), 'admin@gmail.com');
        fireEvent.changeText(getByTestId('problem'), 'My app login not works');

        // use toEqual check value TextInput
        expect(getByTestId('fullName').props.value).toEqual('Admin admin');
        expect(getByTestId('email').props.value).toEqual('admin@gmail.com');
        expect(getByTestId('problem').props.value).toEqual('My app login not works');
        });
    });
});