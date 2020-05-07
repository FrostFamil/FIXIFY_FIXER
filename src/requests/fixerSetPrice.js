import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

const fixerSetPrice = (requestIndex, price, fixerId) => {
    return axios({
    method: 'post',
    url: 'http://192.168.0.87:8080/requests/fixerSetPriceForRequest',
    data: {
        requestIndex: requestIndex,
        price: price,
        fixerId: fixerId
    }
    })
    .then(response => {
        return response.data;
    }, error => {
        console.log(error);
    });
}

export default fixerSetPrice;