import React, {Component} from 'react';
import {Image} from 'react-native'

export class ImageIcon extends Component {

  static images = {
    heart: <Image source={require('./heart.png')}/>,
    plus: <Image source={require('./plus.png')}/>,
    phone: <Image source={require('./phone.png')}/>,
    user: <Image source={require('./user.png')}/>,
  };

  render() {
    let name = this.props.name;
    return React.cloneElement(ImageIcon.images[name]);
  }
}
