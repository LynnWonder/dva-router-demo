import React, {Component} from 'react';
import { renderRoutes } from 'react-router-config';
import {NavLink} from "react-router-dom";
import style from './Home.less'
import styles from "../IndexPage/IndexPage.less";

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

   render() {
      const {routes}=this.props;
        return (
            <div>
              <div className={styles.normal}>
                <div className={styles.welcome}/>
                <div>welcome this is a home page~~~</div>
              <ul className={style.ulist}>
                <li className={style.list}><NavLink to="/counter" activeStyle={{color:'blue'}}>counter</NavLink></li>
                <li className={style.list}><NavLink to="/todo" activeStyle={{color:'blue'}}>to do list</NavLink></li>
                <li className={style.list}><NavLink to="/input" activeStyle={{color:'blue'}}>upload images</NavLink></li>
                <li className={style.list}><NavLink to="/zoom" activeStyle={{color:'blue'}}>pinchzoom images</NavLink></li>
                <li className={style.list}><NavLink to="/lottie" activeStyle={{color:'blue'}}>Lottie</NavLink></li>
                <li className={style.list}><NavLink to="/form" activeStyle={{color:'blue'}}>antd-form</NavLink></li>
              </ul>
              {renderRoutes(routes)}
              </div>
            </div>
        )
    }
}
