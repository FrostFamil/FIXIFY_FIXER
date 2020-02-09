import { StyleSheet, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const styles = {
    findDriverContainer:{
        flex:1,
        backgroundColor:'#97387a',
        alignItems: 'center'
    },
    tabText: {
        color: 'white',
        fontSize:15,
        marginBottom: 10,
        marginTop: 30
    },
    subText: {
        color: 'white',
        fontSize:15,
        marginTop: 10
    },
    subbText: {
        color: 'white',
        fontSize:15,
        marginBottom: 30
    },
    spinner: {
        marginBottom: 50
    },
    text: {
        color: 'white',
        fontSize:25
    },
    content:{
        position: 'absolute',
        flex:1,
        top: 0,
        left: 0,
        right: 0,
        bottom: 250,
        justifyContent:'center',
        alignItems:'center'
    },
    cancelBtn:{
        width:width * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:7,
        borderWidth: 1,
        borderColor:'#fff',
        backgroundColor:'transparent'
    },
    cancelBtnText:{
        color: '#fff',
    }
};

export default styles;
