import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class Another extends Component {

  static propTypes={
    token:PropTypes.string,
  }

  static defaultProps={
    token:'',
  }

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      console.info('another',this.props);
      const {token}=this.props;
      if (token){
        return (
          <div>
            this is another page!
          </div>
        )
      }else{
        return (
          <div>
           请先登录~~~~~
          </div>
        )
      }
    }
}
