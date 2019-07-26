import React, {Component} from 'react';
import * as animationDataA from '../../assets/json/TwitterHeart.json';
import * as animationDataB from '../../assets/json/2016.json';
import * as animationDataC from '../../assets/json/Font.json';
// 这里可以看react-lottie源码
import Lottie from '../../common/react-lottie/react-lottie';
import {renderRoutes} from 'react-router-config';
import {NavLink} from 'react-router-dom';
import style from './LottieDemo.less';

export default class LottieDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isStopped: true,
          direction: 1,
          speed: 3,
          docTxt:'',
        };
    }

    // componentDidMount() {
    //   const {likeStatus}=this.state;
    //   console.info(this.lottie);
    //   console.info(lottie);
    //   this.lottieDom=lottie.loadAnimation({
    //     container: this.lottie,
    //     renderer: 'svg',
    //     loop: false,
    //     autoplay: true,
    //     // path: '../../assets/json/index.json',
    //     animationData: animationDataA,
    //     isStopped:likeStatus,
    //   })
    // }

  handleLike=()=>{
    const {isStopped,direction}=this.state;
    if (!isStopped) {
      this.setState({ direction: direction * -1 });
    }
      this.setState({
        isStopped:false,
      })
  }

  handleInput=(e) => {
    if (e.keyCode === 13){
      if (e.target.value){
        this.setState({docTxt:e.target.value})
      }
    }
  }

  render() {
    const {isStopped,direction,speed,docTxt}=this.state;
    const defaultOptions = [
      {
        animationData: animationDataA,
        loop: false,
        autoplay: false,
      },
      {
        animationData: animationDataB,
        loop: true,
        autoplay: true,
      },
      {
        animationData: animationDataC,
        loop: true,
        autoplay: true,
      }
    ];
    const documentData={
      doc:{t: docTxt, s: 70},
      kfm:0,
    }
    const handler=[
      {
        eventName:'loopComplete',
        callback:(e)=>{
          console.info(`💗第${e.currentLoop}次loop完成`)
        }
      }
    ];
    // console.info(this.props);
        return (
          <div>
            <p>收藏喜欢的文章(click)</p>
            <div className={style['lottie-0']}>
            <Lottie
              options={defaultOptions[0]}
              isStopped={isStopped}
              speed={speed}
              direction={direction}
            />
              <div className={style['lottie-btn']} onClick={this.handleLike}/>
            </div>
            <NavLink to='/lottie/more' className={style['lottie-footer']}>了解更多demo</NavLink>
            <p>添加事件监听</p>
            <Lottie
              options={defaultOptions[1]}
              eventListeners={handler}
            />
            <div className={style['lottie-2']}>
              <Lottie
                options={defaultOptions[2]}
                updateDocumentData={documentData}
              />
              <p>
                <input type="text"  onKeyDown={this.handleInput}/>
                <span>tips:输入完成后敲击回车改变内容哦~</span>
              </p>
            </div>
            {renderRoutes(this.props.route.routes)}
            {/* 另一张引入Lottie动画的方式，不推荐使用 */}
            {/*<div style={{width:'500px',height:'500px'}} className="lottie" data-animation-path="../../assets/json/bell.json"*/}
            {/*     data-anim-loop="true" data-name="ninja"></div>*/}
          </div>
        )
    }
}
