import React,{PureComponent} from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import {renderRoutes} from "react-router-config";
import styles from './IndexPage.css';

class IndexPage extends PureComponent {
  static propTypes = {
    count:PropTypes.number,
  };
  static defaultProps = {
    count:0
  };

  minusClick=async ()=>{
    const {dispatch}=this.props;
    await dispatch({
      type: 'count/minuscount'
    })
  }

  addClick=async()=>{
    const {dispatch}=this.props;
    await dispatch({
      type: 'count/addcount'
    })
  }
  handleChange=(e)=>{
    this.value=e.target.value;
    // console.log(this.value)
  }
  handleClick=async()=>{
    const {dispatch}=this.props;
    await dispatch({
      type:'count/change',
      payload:{
        item:this.value?this.value:0
      }
    })

}

  render() {
    console.info(this.props.route.routes)
    return (
      <div>
        <div className={styles.normal}>
          <div className={styles.welcome}/>
          <div>
            <input type="number" onChange={this.handleChange} placeholder="0"/>
            <button onClick={this.handleClick}>specialAdd</button>
          </div>
          <button className={styles.minus} onClick={this.minusClick}>-</button>
          {this.props.count}
          <button className={styles.add} onClick={this.addClick}>+</button>
        </div>
        <div className="sub-pages">
          {renderRoutes(this.props.route.routes)}
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    count: state.count
  }
}

const _IndexPage = connect(mapStateToProps)(IndexPage)

export default _IndexPage
