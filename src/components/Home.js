import React, {Component} from 'react';
import { renderRoutes } from 'react-router-config';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      const {routes}=this.props;
      console.log(this.props)
      console.log(routes)
        return (
            <div>
              {renderRoutes(routes)}
            </div>
        )
    }
}
