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
        this.tMatrix = [1,0,0,1,0,0]//x缩放，无，无，y缩放，x平移，y平移
        this.poscenter=this.point2D(0,0);//缓存双指的中心坐标
        this.duration='';
        this.lastTranslate=this.point2D(0,0);//记录上次的偏移值
        this.lastcenter=null;
        this.center=this.lastcenter;

    }

    componentDidMount() {
      this._initPinchZoom();
    }

    componentWillUnmount() {
      this.destroy();
    }
  point2D=(x,y)=>{
    return {x : x,y : y};
  }
  reqAnimationFrame = (function () {
    return window[Hammer.prefixed(window, 'requestAnimationFrame')] || function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
  })();
  onPinchStart=(ev)=>{
    this.duration = '';
    this.lastTranslate = this.point2D(this.tMatrix[4],this.tMatrix[5])//记录上一次的偏移值
    this.initScale = this.tMatrix[0] || 1;
    this.poscenter = this.point2D(ev.center.x, ev.center.y)

    this.lastcenter = this.point2D(this.center.x + this.lastTranslate.x,this.center.y + this.lastTranslate.y)//重新计算放大后的中心坐标
    this.poscenter = this.point2D(ev.center.x - this.lastcenter.x, ev.center.y-this.lastcenter.y)
    console.log("center",this.lastcenter.x,this.lastcenter.y)

    requestElementUpdate('onpinchStart');
  }
  onPinch=(ev)=>{
    const nowScale = this.tMatrix[0] = this.tMatrix[3] = this.initScale * ev.scale;
    const composscal = (1 - ev.scale)
    this.tMatrix[4] = (1 - ev.scale) * this.poscenter.x + this.lastTranslate.x
    this.tMatrix[5] = (1 - ev.scale) * this.poscenter.y + this.lastTranslate.y
    this.requestElementUpdate('onpinch');
  }
  updateElementTransform=()=>{
    el.style.transition = duration
    const tmp = this.tMatrix.join(',')
    console.log(tmp)
    el.style.transform = 'matrix(' + tmp + ')';
    this.ticking = false;
  }
  requestElementUpdate=()=>{
    arguments && console.log(arguments[0])
    if(!this.ticking) {
      this.reqAnimationFrame(updateElementTransform);
      this.ticking = true;
    }
  }

  _initPinchZoom=()=>{
      const {options}=this.props;
      this.pinch=new PinchZoom(this.dom,options);
    }

  destroy=()=>{
    this.pinch.container.remove();
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
