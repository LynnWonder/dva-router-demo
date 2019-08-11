import React, {Component} from 'react';

export default function FormProvider(fields){
  const initialFormState={};
  Object.keys(fields).forEach((item)=>{
    initialFormState[item]={
      value:fields[item].defaultValue,
      error:'',
      valid:true,
    };
  });
  return  function (Comp){
    return class wrapComponent extends Component{
      constructor(props) {
        super(props);
        this.state = {
          form:initialFormState, // todo 保存表单中字段的值
          formValid:false // todo 整个表单校验状态
        };
      }
      handleFormChange=(fieldName,value)=>{
        //todo 表单发生变化
        const {form}=this.state;
        const newFieldState = {value, valid: true, error: ''};
        const fieldRules = fields[fieldName].rules;
        // 循环
        for(let i=0; i<fieldRules.length; i++){
          const {pattern, error} = fieldRules[i];
          let valid = false;
          if(pattern==='required'){
            valid = value;
          }else{
            valid = pattern.test(value);
          }
          if(!valid){
            newFieldState.valid = false;
            newFieldState.error = error;
            break;
          }
        }
        // 覆盖表单中叫fieldName的值
        // [fieldName]:value创建了一个对象
        const newForm={...form,[fieldName]:{...newFieldState}};
        const newFormValid=Object.values(newForm).every((item)=>{
          console.info(item.valid);
          return item.valid;
        });
        this.setState({
          form:newForm,
          formValid:newFormValid,
        })
      };

      render() {
        const {form,formValid}=this.state;
        return (
            <Comp {...this.props}  form={form} formValid={formValid} onFormChange={this.handleFormChange}/>
        )
      }
    }

  }
}


