import * as todoService from '../services/todo'
let todolist=localStorage.getItem('todo');
todolist=todolist?JSON.parse(todolist):[];
export default {
  namespace: 'todo',
  state: {
    list: todolist //state初始值，读取localStorage中的内容
  },
  reducers: {  //修改state的地方
    save(state, { payload: { list } }) {
      return {
        ...state,
        list
      }
    }
  },
  effects: {
    *addTodo({ payload: value }, { call, put, select }) {
      // 模拟网络请求 ,实际上我们并没有请求后端数据
      //call select put方法的第一个都是具体函数名
      // select异步获取最新的list
      const {data={}}=yield call(todoService.query,value);
      const tempList=yield select(state=>state.todo.list);
      console.log(tempList);
      let list=[];
      // 这个步骤很有必要
      list=list.concat(tempList);
      const tempObj={};
      tempObj.title=value;
      tempObj.id=list.length;
      tempObj.finished=false;
      tempObj.change=false;
      list.push(tempObj);
      localStorage.setItem('todo',JSON.stringify(list));
      yield put({type:'save',payload:{list}})
    },
    *toggle({ payload: index }, { call, put, select }) {
      // 模拟网络请求
      const data = yield call(todoService.query, index)
      let tempList = yield select(state => state.todo.list)
      let list = []
      list = list.concat(tempList)
      let obj = list[index]
      obj.finished = !obj.finished;
      obj.change=false;
      localStorage.setItem('todo',JSON.stringify(list));
      // 最后一定都要进行一下保存
      yield put({ type: 'save', payload: { list } })
    },
    *delete({ payload: index }, { call, put, select }) {
      const data = yield call(todoService.query, index)
      let tempList = yield select(state => state.todo.list)
      let list = []
      list = list.concat(tempList)
      console.info('----delete-model',index);
      list.splice(index, 1)
      localStorage.setItem('todo',JSON.stringify(list))
      yield put({ type: 'save', payload: { list } })
    },
    *modify({ payload: { value, index } }, { call, put, select }) {
      const data = yield call(todoService.query, value)
      let tempList = yield select(state => state.todo.list)
      let list = []
      list = list.concat(tempList)
      let tempObj = list[index]
      // 替换一下title
      tempObj.title = value;
      tempObj.change=true;
      list.splice(index,1,tempObj);
      localStorage.setItem('todo',JSON.stringify(list));
      yield put({ type: 'save', payload: { list } })
    },
    *change({payload:{index}},{call,put,select}){
      // const data = yield call(todoService.query, value)
      let tempList = yield select(state => state.todo.list)
      let list = []
      list = list.concat(tempList)
      let tempObj = list[index]
      // 替换一下title
      tempObj.change=!tempObj.change;
      list.splice(index,1,tempObj);
      localStorage.setItem('todo',JSON.stringify(list));
      yield put({ type: 'save', payload: { list } })
    }
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     // 监听路由的变化，请求页面数据
  //     return history.listen(({ pathname, search }) => {
  //       const query = queryString.parse(search)
  //       let list = []
  //       if (pathname === 'todoList') {
  //         dispatch({ type: 'save', payload: {list} })
  //       }
  //     })
  //   }
  // }
}
