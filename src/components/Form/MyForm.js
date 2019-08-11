import React, {Component} from 'react';
import {message} from 'antd';
import FormProvider from '../../common/hoc/FormProvider';

class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
  handleClick=()=>{
      const {form,formValid}=this.props;
      if (!formValid){
        message.error('please input correct information');
      }else{
        message.success('submitted!');
        console.info('已提交data',form);
      }
  };
    render() {
      const {form:{name},onFormChange}=this.props;
      console.info(this.props.form);
        return (
            <div>
              <span>请输入用户名</span>
              <input
                type="text"
                value={name.value}
                onChange={(e)=>onFormChange('name',e.target.value)}
                placeholder="please input your name!"
              />
              <button onClick={this.handleClick}>submit!</button>
              {name.valid?null:(<div style={{color:'red'}}>{`💔${name.error}`}</div>)}
            </div>
        )
    }
}
const fields={
  //todo
  name:{
    defaultValue:'',
    rules:[
      {
        pattern:'required',
        error:'name cannot be blank'
      },
      {
        pattern:/^.{1,4}$/,
        error:'name cannot be more than 4 words'
      }
    ]
  },
};
MyForm=FormProvider(fields)(MyForm);
export default MyForm;
