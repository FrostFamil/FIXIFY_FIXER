import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const pushNotification = (token, fName, lName, fixerId, serviceType) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.88:8080/notification/saveFixersToken',
    data: {
        token: token,
        fName: fName,
        lName: lName,
        fixerId: fixerId,
        serviceType: serviceType
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export {pushNotification};