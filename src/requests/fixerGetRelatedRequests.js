import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerGetRelatedRequests = (serviceType) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/fixerGetAllRelatedRequest',
    data: {
        serviceType: serviceType
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default fixerGetRelatedRequests;