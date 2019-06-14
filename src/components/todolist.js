import React, {Component} from 'react'
import PropTypes from 'prop-types';
import styles from './todolist.css'
import {connect} from 'dva'

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
      value: ''
    }
  }
  removeItem=async (index)=>{
    this.props.dispatch({
      type: 'todo/delete',
      payload: index
    })
  }

  toggleItem=async (index)=>{
    this.props.dispatch({
      type: 'todo/toggle',
      payload: index
    })
  }
  modifyItem=async (value, index)=>{
    this.input.readOnly=true;
    this.props.dispatch({
      type: 'todo/modify',
      payload: {value, index}
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
  render() {
    const { list } = this.props;
    let count = 0
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
                      defaultValue={item.title}
                      autoFocus={false}
                      onKeyDown={(e) => {
                        if (e.keyCode === 13){
                          let title = e.target.value
                          this.modifyItem(title, index)
                        }
                      }}
                      readOnly="true"
                      ref={(input)=>this.input=input}
                    />
                    <button onClick={()=>this.input.readOnly=false}>改</button>
                    <button onClick={() =>this.removeItem(index)}>删</button>
                  </li>
                )
              })
            }
          </ul>
        </span>
      </div>
    )
  }
}
// 解构赋值：从state中解构出来todo对象
const mapStateToProps=({todo})=>(
  {
    list: todo.list
  }
)


const _todolist = connect(mapStateToProps)(todolist)

export default _todolist
