import React, {Component} from 'react';
import {Icon} from 'antd-mobile';
import style from './Loading.less';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
    render() {
    console.info('按需加载传来的参数---',this.props);
      if (this.props.error) {
        return <div>Error! <button onClick={ this.props.retry }>Retry</button></div>;
      } else if (this.props.pastDelay) {
        return <Icon type={Loading} className={style.icon}/>;
      } else {
        return null;
      }
    }
}
