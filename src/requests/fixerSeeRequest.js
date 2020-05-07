import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerSeeRequest = (requestIndex) => {
    return axios({
    method: 'post',
    url: 'http://localhost:8080/requests/seeRequest',
    data: {
        requestIndex: requestIndex
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default fixerSeeRequest;