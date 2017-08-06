export default {
  data: {
    person: 'u3xyz'
  },
  
  methods: {
    bye(who, msg) {
      this.setData({
        'bye-duplicate': `bye-duplicate: bye ${who}, ${msg}`
      });
      
      console.log(`bye-duplicate: bye ${who}, ${msg}`);
    }
  }
}