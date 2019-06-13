import IndexPage from '../components/IndexPage'
import NotFound from '../components/NotFound'
import Another from '../components/Another'
import React from "react";
import {Redirect} from "react-router";
const routeConfig = [
  {
    path:'/',
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
      {
        path:"/*",
        component:()=><Redirect to="/home"/>
      }
    ]
  },
];

export default routeConfig;
