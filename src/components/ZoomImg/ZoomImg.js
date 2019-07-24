import React, {Component} from 'react';
import Pinchzoom from '../PinchZoom/pinchzoom';
import style from './ZoomImg.less';

export default class ZoomImg extends Component {
    constructor(props) {
        super(props);
    }

  render() {
        return (
            <div className={style.zoom}>
              <Pinchzoom options={{lockDragAxis:true,minZoom:0.1}}>
              <img src="https://img-blog.csdnimg.cn/20190724171639433.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2x5bm53b25kZXI2,size_16,color_FFFFFF,t_70" />
              </Pinchzoom>
            </div>
        )
    }
}
