/*
* 使用hammer.js实现的移动，手势缩放图片
* * */
import React, {Component} from 'react';
import Hammer from 'hammerjs';
import eruda from 'eruda';
import style from './index.less';

export default class TestHammer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.hammer=null;
    }
    componentDidMount() {
      eruda.init();
      console.info(eruda)
      this.transform={
        scale:1,
      }
      this.ticking=false;
      this.initScale=1;
      this.hammer=new Hammer(this.el);
      this.hammer.get('pan').set({direction: Hammer.DIRECTION_ALL});//激活pan(移动)功能
      this.hammer.get('pinch').set({enable: true});//激活pinch(双指缩放)功能
      this.hammer.on("panstart",this.panstart);
      this.hammer.on("pinchout pinchin", this.onPinch);
    }
    panmove=(event)=>{
      console.info(this.left,this.tp,event.deltaX,event.deltaY);
      console.info(event);
      this.el.style.left = this.left + event.deltaX + 'px';
      this.el.style.top = this.tp + event.deltaY + 'px';
    }
  onPinch=(ev)=>{
    if(ev.type == 'pinchstart') {
      this.initScale= this.transform.scale || 1;
    }
    this.transform.scale = this.initScale * ev.scale;
    this.requestElementUpdate();
  }
  requestElementUpdate=()=>{
    if(!this.ticking) {
      requestAnimationFrame(()=>{
        this.el.style.transform = `scale(${this.transform.scale})`;
        this.ticking = false;
      })
      this.ticking = true;
    }
  }
  panstart=()=>{
    this.left = this.el.offsetLeft;
    this.tp = this.el.offsetTop;
    this.hammer.on("panmove",this.panmove);
  }

  render() {
        return (
            <div  className={style['hammer-0']}>
              <img ref={(div)=>{this.el=div}}
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545628346247&di=f2fcd4f88291e0f60d6599602ee8ab20&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3304533311%2C1137740692%26fm%3D214%26gp%3D0.jpg" />
            </div>
        )
    }
}
