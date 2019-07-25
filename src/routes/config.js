import React from "react";
import Loadable from 'react-loadable';
import IndexPage from '../components/IndexPage/IndexPage';
import Another from '../components/Another/Another';
import ToDoList from '../components/TodoList/todolist';
import Input from '../components/Input/Input';
import Loading from '../components/Loading/Loading';
import ZoomImg from '../components/ZoomImg/ZoomImg';
import LottieDemo from '../components/LottieDemo/LottieDemo';
import LottieMore from '../components/LottieDemo/OtherDemo/OtherDemo';

const routeConfig = [
  {
    path:"/todo",
    // component:ToDoList,
    // 测试使用路由按需加载
    component:Loadable({
      loader:()=>import('../components/TodoList/todolist'),
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
  },
  {
    path:"/input",
    component:Input,
    exact:true,
  },
  {
    path:"/counter",
    exact:true,
    component:IndexPage,
  },
  {
    path:"/zoom",
    exact:true,
    component:ZoomImg,
  },
  {
    path:"/lottie",
    component:LottieDemo,
    routes: [
      {
        path:"/lottie/more",
        exact:true,
        component:LottieMore,
      },
    ],
  },
  // {
  //   path:"/*",
  //   component:()=><Redirect to="/counter"/>,
  //   requiresAuth:false,
  // },
];

export default routeConfig;
