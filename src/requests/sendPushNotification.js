import React from 'react';
import {AsycnStorage } from 'react-native';
import axios from 'axios';

let sendPushNotification = (to, title, body) => {
    return axios({
    method: 'post',
    url: 'https://exp.host/--/api/v2/push/send',
    data: {
        to: to,
        title: title,
        body: body,
        sound: 'default'
    }
    })
    .then(response => {
        return response;
    }, error => {
        console.log(error);
    });
}

export default sendPushNotification;