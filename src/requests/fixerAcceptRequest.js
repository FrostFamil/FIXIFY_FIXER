import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerAcceptRequest = (requestIndex, fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.89:8080/requests/acceptRequest',
    data: {
        requestIndex: requestIndex,
        fixerId: fixerId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default fixerAcceptRequest;