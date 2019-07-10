export default {
  namespace: 'auth',
  state: {
    auth:true,
  },
  reducers: {
    setAuth(state,{payload}){
      console.info('---payload',payload);
      return{
        ...state,
        auth:payload,
      }
    }
  },
}
