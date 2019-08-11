import React, {Component} from 'react';
import {renderRoutes} from 'react-router-config';
import {NavLink} from 'react-router-dom';
import style from './input.less'


export default class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
          src:'',
        };
    }
    _getObjectURL(file) {
    var url = null;
    if (window.createObjcectURL !== undefined) {
      url = window.createOjcectURL(file);
    } else if (window.URL != undefined) {
      url = window.URL.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
      url = window.webkitURL.createObjectURL(file);
    }
    return url;
  }

  handleImageChange=(e)=>{
      //target 事件属性可返回事件的目标节点（触发该事件的节点）
      const file=e.target.files[0];
      console.info(file);
      const URL = window.webkitURL;
      // 通过 file 生成目标 url
      const imgURL = this._getObjectURL(file);
      console.info(imgURL);
    this.setState({src:imgURL});
    this.input.value=null;
  };

  // 点击图片删除
  handleImgDelete=(e)=>{
      console.info(e.target);
      this.setState({src:null});
  };
    render() {
      const {src}=this.state;
        return (
            <div className={style['input-com']}>
              <input className={style.container} type="file" onChange={this.handleImageChange}
                     ref={(input)=>this.input=input}/>
              <img  className={style.img} src={src} alt="上传图片" onClick={this.handleImgDelete}/>
              <NavLink to='/input/pass' className={style['input-footer']}>组件间传值</NavLink>
              {renderRoutes(this.props.route.routes)}
            </div>
        )
    }
}
