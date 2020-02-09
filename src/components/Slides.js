import React, {Component} from 'react';
import { View, Text, ScrollView, Dimensions, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements';


const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

  renderLastSlide = (index) => {

    if (index === this.props.data.length - 1){
      return (
        <Button
          title="Start"
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
       />
      );
    }
  }

  renderSlides = () => {
    return this.props.data.map((slide, index) => {

      return (
        <View key={slide.id} style={[styles.slide]}>
          <ImageBackground source={slide.image} style={{ height: "100%", width: "100%"}}>
           {this.renderLastSlide(index)}
          </ImageBackground>
        </View>
      );
    })
  }

  render() {
    return(
      <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = {
  slideText: {
    fontSize: 30,
    color: 'white'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH
  },
  buttonStyle: {
    backgroundColor: '#f85f68',
    marginLeft: 142,
    marginTop: 600,
    width: 100
  }
}

export default Slides;
