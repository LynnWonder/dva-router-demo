import React from "react";
import {Redirect} from "react-router";
import IndexPage from '../components/IndexPage'
import Another from '../components/Another'
import ToDoList from '../components/todolist'

const routeConfig = [
  {
    path:'/counter',
    component: IndexPage,
    routes: [
      {
        path:"/another",
        exact:true,
        component:Another,
      },
      {
        path:"/home",
        exact:true,
        component:()=>{
          return <div>this is a home page!</div>
        }
      },
    ]
  },
  {
    path:"/todo",
    exact:true,
    component:ToDoList,
  },
  {
    path:"/*",
    component:()=><Redirect to="/counter"/>
  },
];

export default routeConfig;
