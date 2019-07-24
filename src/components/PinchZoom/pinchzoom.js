import React, {Component} from 'react';
import PinchZoom from 'pinch-zoom-js';
import PropTypes from 'prop-types';

export default class Pinchzoom extends Component {
  static propTypes = {
    options: PropTypes.object,
  };
  static defaultProps={
    options:{}
  }
    constructor(props) {
        super(props);
        this.pinch=null;
    }

    componentDidMount() {
      this._initPinchZoom();
    }
    _initPinchZoom=()=>{
      const {options}=this.props;
      this.pinch=new PinchZoom(this.dom,options);
      console.info(this.pinch);
    }

  render() {
    const {children}=this.props;
        return (
            <div ref={(div)=>{this.dom=div;}}>
              {children}
            </div>
        )
    }
}
