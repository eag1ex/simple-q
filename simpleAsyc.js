


const {isFunction, isPromise,isArray} = require('./utils')

module.exports= function(defered){
 // if(!isFunction(cb)) throw `cb must be a function`
  this.defered = defered
  const self = this
  this.asyncCallBack = cb 
  this.mem = 0

  let _resolve = null
  let _reject = null
  const  p = new Promise((resolve,reject)=>{
    _resolve = resolve
    _reject = reject
  })

  const range = {
    from: 1,
    to: 5,
  
    // for await..of calls this method once in the very beginning
    [Symbol.asyncIterator]() { // (1)
      // ...it returns the iterator object:
      // onward, for await..of works only with that object,
      // asking it for next values using next()
      return {
        current: this.from,
        last: this.to,
  
        // next() is called on each iteration by the for await..of loop
        async next() { // (2)
          if(self.mem===5) { 
            p_resolve('symbol resolved')
            return { done: true };
          } 
          // it should return the value as an object {done:.., value :...}
          // (automatically wrapped into a promise by async)
  
          // can use await inside, do async stuff:
          await new Promise(resolve => setTimeout(resolve, 1000)); // (3)
  
          if (this.current <= this.last) {
            self.mem++
            return { done: false, value: this.current++ };
          } else {
            return { done: true };
          }
        }
      };
    }
  };
  (async () => {
  
    for await (let value of range) { // (4)

      if(value===3) break
      console.log(value, this.mem); // 1,2,3,4,5
    }
    for await (let value of range) { // (4)
      console.log(value,this.mem); // 1,2,3,4,5
    }
  
  })()

  this.promise = ()=>{
    if(resolve_set) return Promise.resolve(resolve_set)
    return p
  }

}
const m = new MemPromise()