export default {
  data: {
    person: 'pony',
    number: 0
  },

  methods: {
    increase() {
      this.setData({
        'number': ++this.data.number
      });  
      
      console.log(`number=${this.data.number}`);
    },
    
    decrease() {
      this.setData({
        'number': --this.data.number
      });

      console.log(`number=${this.data.number}`);
    },

    bye(param) {
      let {who, msg} = param;
      
      this.setData({
        'bye-counter': `bye-counter: bye ${who}, ${msg}`
      });

      console.log(`bye-counter: bye ${who}, ${msg}`);
      
      return {
        who,
        msg
      }
    }
  }
}