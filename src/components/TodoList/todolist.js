import React, {Component} from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {renderRoutes} from 'react-router-config'
import {NavLink} from "react-router-dom";
import styles from './todolist.less';

class todolist extends Component {
  static propsTypes={
    list:PropTypes.array,
  }
  static defaultProps={
    list:[],
  }
  constructor(props) {
    super(props)
    this.state = {
      // 此处把value放在state比较好，外界不能修改这个value只能通过setState来change
      value: '',
      // 标识登录与否
      log:false,
    }
  }
  componentDidMount() {
    // 删除localStorage中的值
    // localStorage.removeItem('todo');
  }

  removeItem= (index)=>{
    this.props.dispatch({
      type: 'todo/delete',
      payload: index
    })
  }

  toggleItem= (index)=>{
    this.props.dispatch({
      type: 'todo/toggle',
      payload: index
    })
  }
  modifyItem= (value, index)=>{
    this.props.dispatch({
      type: 'todo/modify',
      payload: {value, index}
    })
  }
  // 用来修改输入框是否可以修改用
  changeItem=(index)=>{
    this.props.dispatch({
      type:'todo/change',
      payload:{index}
    })
  }
  addTodo(value) {
    this.props.dispatch({
      type: 'todo/addTodo',
      payload: value
    })
    this.setState({value: ''})
  }
  handleClick=()=>{
    this.addTodo(this.state.value)
  }

  handleLog=()=>{
    const {log}=this.state;
    this.setState({log:!log});
  }


  render() {
    const { list } = this.props;
    const {log}=this.state;
    const token=log?'aaa':null;
    console.info('--todo--',this.props.route.routes);
    let count = 0
    // 修复bug:在list列表删除指定条目后，store以及取出的值(包括打印mapStateToProps)都相应改变，
    // 但是删除的条目不对总是从最后一条开始删除，定位问题是defaultValue的问题


    // 下面的逻辑是：定义count为如果item不是完成状态则count+1
    // 用map逻辑没毛病，不会修改原数组
    list.map(item => count = !item.finished ? count + 1 : count)
    return (
      <div className={styles.container}>
        <span>
          <h1>我的待办清单：</h1>
          <h3>有*{count}*项待办事项未处理</h3>
        </span>
        <input
          style={{borderWidth: 1, borderColor: 'red'}}
          placeholder="请输入代办事项~~~"
          value={this.state.value}
          autoFocus={true}
          onChange={(e) => this.setState({value: e.target.value})}
          onKeyDown={(e) => {
            if (e.keyCode === 13){
              let title = e.target.value
              title.length > 0 ? this.addTodo(title) : null
            }
          }}
        />
        <button onClick={this.handleClick}>增</button>
        <span>
          <ul>
            {
              list.map((item, index) => {
                return (
                  <li key={index} style={{listStyle:'none'}}>
                    <input
                      type="checkbox"
                      checked={item.finished}
                      onChange={() => this.toggleItem(index)}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13){
                          let title = e.target.value
                          title.length > 0 ? this.addTodo(title) : null
                        }
                      }}
                    />
                    <input
                      style={{width: 200,height: 20}}
                      // defaultValue={item.title}
                      value={item.title}
                      autoFocus={false}
                      onChange={(e) => {
                          let title = e.target.value
                          this.modifyItem(title, index)
                      }}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13){
                          // 修改输入框可编辑状态
                          this.changeItem(index);
                        }
                      }}
                      disabled={!item.change}
                    />
                    <button onClick={()=>{this.changeItem(index)}}>改</button>
                    <button onClick={() =>this.removeItem(index)}>删</button>
                  </li>
                )
              })
            }
          </ul>
        </span>
        <input type="checkbox" checked={log} onChange={this.handleLog}/>
        {log?'已登录':'未登录'}
        <ul>
          <li><NavLink to="/todo/another">another</NavLink></li>
        </ul>
        {renderRoutes(this.props.route.routes, {token})}
      </div>

    )
  }
}
// 解构赋值：从state中解构出来todo对象
const mapStateToProps=({todo})=>{
  return {
    list:[...todo.list],
  }
}


const _todolist = connect(mapStateToProps)(todolist)

export default _todolist
