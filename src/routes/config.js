import React from "react";
import Loadable from 'react-loadable';
import IndexPage from '../components/IndexPage';
import Another from '../components/Another';
import ToDoList from '../components/todolist';
import Input from '../components/Input';
import Loading from '../components/Loading/Loading';

const routeConfig = [
  {
    path:"/todo",
    // component:ToDoList,
    // 测试使用路由按需加载
    component:Loadable({
      loader:()=>import('../components/todolist'),
      loading:Loading,
      delay:1000,
    }),
    routes: [
      {
        path:"/todo/another",
        exact:true,
        component:Another,
      },
    ],
    requiresAuth:false,
  },
  {
    path:"/input",
    component:Input,
    exact:true,
    requiresAuth:false,
  },
  {
    path:"/counter",
    exact:true,
    component:IndexPage,
    requiresAuth:false,
  },
  // {
  //   path:"/*",
  //   component:()=><Redirect to="/counter"/>,
  //   requiresAuth:false,
  // },
];

export default routeConfig;
