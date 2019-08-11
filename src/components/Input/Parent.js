import React, {Component} from 'react';
import Child from './Child';

export default class Parent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          val:'',
        };
    }
    handleChange=(val)=>{
      this.setState({
        val
      })
    };
    render() {
      const {val}=this.state;
        return (
            <div>
              <h1>{val}</h1>
              <Child handleChange={this.handleChange}/>
            </div>
        )
    }
}
