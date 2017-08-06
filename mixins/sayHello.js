export default {
  data: {
    person: 'jack'
  },

  methods: {
    sayHello() {
      console.log(`hello, ${this.data.person}!`);
    },

    bye(who, msg) {
      this.setData({
        'bye-sayHello': `bye-sayHello: bye ${who}, ${msg}`
      });

      console.log(`bye-sayHello: bye ${who}, ${msg}`);

      return {
        who,
        msg
      }
    }
  }
}