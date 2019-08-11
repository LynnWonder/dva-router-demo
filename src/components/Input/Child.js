import React, {Component} from 'react';

export default class Child extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
      const {handleChange}=this.props;
        return (
            <div>
              <div>请输入内容：</div>
              <input type="text" onChange={(e)=>handleChange(e.target.value)}/>
            </div>
        )
    }
}
