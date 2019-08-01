import React, {Component} from 'react';
import Pinchzoom from '../PinchZoom/pinchzoom';
import {Toast} from 'antd-mobile';
import eruda from 'eruda';
import Hammer from 'react-hammerjs';
import style from './ZoomImg.less';

export default class ZoomImg extends Component {
    constructor(props) {
        super(props);
        this.state={
          visible:false,
        }
    }

    componentDidMount() {
      eruda.init();
      console.info(eruda)
      this.transform={
        scale:1,
      }
      this.ticking=false;
      this.initScale=1;
    }

  //添加事件回调
  zoomStart=()=>{
      Toast.info('start zooming...',1);
  }

  handleClick=()=>{
    const {visible}=this.state;
    this.setState({
      visible:!visible,
    })
  }

  handleTap=()=>{
      Toast.info('tapping',1);
  }
  requestElementUpdate=()=>{
    if(!this.ticking) {
      requestAnimationFrame(()=>{
        // 获取内部的dom元素
        this.el.domElement.style.transform = `scale(${this.transform.scale})`;
        // 节流功能
        console.info('animating...');
        this.ticking = false;
      })
      this.ticking = true;
    }
  }
  handlePinch0=()=>{
    this.initScale= this.transform.scale || 1;
  }

  handlePinch=(e)=>{
      console.info(e.scale);
      // Toast.info('pinching',1);
      this.transform.scale = this.initScale * e.scale;
      this.requestElementUpdate();
  }


  render() {
      const {visible}=this.state;
      const options= {
        touchAction:'compute',
        recognizers: {
          tap: {
            time: 600,
            threshold: 100
          },
          pinch: { enable: true }
        }
      };
        return (
            <div className={style.zoom}>
              <button onClick={this.handleClick}>{visible?'OFF':'ON'}</button>
              <Pinchzoom options={{lockDragAxis:true,minZoom:0.1,onZoomStart:this.zoomStart}}>
                <img src="https://img-blog.csdnimg.cn/20190724171639433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5bm53b25kZXI2,size_16,color_FFFFFF,t_70" />
              </Pinchzoom>
              {
                visible?(
                  <Hammer
                    onTap={this.handleTap}
                    options={options}
                    onPinchStart={this.handlePinch0}
                    onPinch={this.handlePinch}
                    ref={(div)=>{this.el=div;}}
                  >
                    <div className={style.hammer} >test Hammer</div>
                  </Hammer>
                ):null
              }
              {/*<Hammer*/}
              {/*  onTap={this.handleTap}*/}
              {/*  options={options}*/}
              {/*  onPinchStart={this.handlePinch0}*/}
              {/*  onPinch={this.handlePinch}*/}
              {/*  ref={(div)=>{this.el=div;}}*/}
              {/*>*/}
              {/*  <div className={style.hammer} >test Hammer</div>*/}
              {/*</Hammer>*/}
            </div>
        )
    }
}

