import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerGetPendingRequests = (acceptor) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/requests/fixerGetPendingRequest',
    data: {
        acceptor: acceptor
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default fixerGetPendingRequests;