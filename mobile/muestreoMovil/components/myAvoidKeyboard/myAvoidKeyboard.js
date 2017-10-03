import React from 'react';
import {
  Animated,
  Platform,
  Keyboard
} from 'react-native';
import { RkComponent } from 'react-native-ui-kitten';

/**
 * `RkAvoidKeyboard` is a component for handling keyboard appearing on the screen.
 * This component is just a container for other react components. In order to avoid keyboard it just changes `top` value according to keyboard height.
 * It doesn't have any customization. We also recommend not customize it.
 * @extends RkComponent
 *
 * @example Sample Usage:
 *
 * ```
 * <RkAvoidKeyboard>
 *   <RkTextInput/>
 * </RkAvoidKeyboard>
 * ```
 */
export default class MyAvoidKeyboard extends RkComponent {
  componentName = 'MyAvoidKeyboard';
  typeMapping = {
    container: {}
  };

  constructor(props) {
    super(props);
    this.state = {
      top: new Animated.Value(0),
      duration: 0.5,
    };
        console.log('kbCons');

    this.onKeyboardWillShow = this._onKeyboardWillShow.bind(this);
    this.onKeyboardWillHide = this._onKeyboardWillHide.bind(this);
  }

  componentWillMount() {
    //if (Platform.OS === 'ios') {
      this.keyboardWillShowListner = Keyboard.addListener('keyboardDidShow', this.onKeyboardWillShow);
      this.keyboardWillHideListner = Keyboard.addListener('keyboardDidHide', this.onKeyboardWillHide);
    //}
  }

  componentWillUnmount() {
    //if (Platform.OS === 'ios') {
      this.keyboardWillShowListner.remove();
      this.keyboardWillHideListner.remove();
    //}
  }

  _onKeyboardWillShow(e) {
      console.log(`eShow: ${JSON.stringify(e)}`);
      this.setState({duration: e.duration});
    Animated.timing(this.state.top, {
      toValue: -(e.endCoordinates.height),
      duration: e.duration,
    }).start();
  }

  _onKeyboardWillHide(e) {
          Animated.timing(this.state.top, {
              toValue: 0,
              duration: this.state.duration,
          }).start();
  }

  render() {
    let {
      style,
      children,
      ...props
    } = this.props;

    let {container} = this.defineStyles();

    return (
      <Animated.View style={[container, {top: this.state.top}, style, {backgroundColor: '#d2dfed'}]}
                     {...props}>
        {children}
      </Animated.View>
    );
  }
}
