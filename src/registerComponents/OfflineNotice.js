import React, { PureComponent } from 'react';
import { View, Text, Dimensions, StyleSheet, Modal } from 'react-native';
const { width } = Dimensions.get('window');


class OfflineNotice extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.internet}
        >
         <View style={styles.offlineContainer}>
           <Text style={styles.offlineText}>No Internet Connection</Text>
         </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: width,
    top: 40
  },
  offlineText: {
    color: '#fff'
  }
});
export default OfflineNotice;
