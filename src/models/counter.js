export default {
  namespace: 'count',
  state: 1,
  reducers: {
    addcount(count,{payload={}}) {

      return count + 1||count+item
    },
    minuscount(count) {
      return count -1
    },
    change(count,{payload={}}){
      const {item}=payload;
      return count+parseInt(item);

    }
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  }
}
