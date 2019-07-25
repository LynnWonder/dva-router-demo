import React, {Component} from 'react';
import * as animationDataA from '../../assets/json/TwitterHeart.json';
import * as animationDataB from '../../assets/json/2016.json';
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

  render() {
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
      }
    ];
    const handler=[
      {
        eventName:'loopComplete',
        callback:(e)=>{
          console.info(`💗第${e.currentLoop}次loop完成`)
        }
      }
    ];
    const {isStopped,direction,speed}=this.state;
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
            {renderRoutes(this.props.route.routes)}
          </div>
        )
    }
}
