`use strict`
/**
 * SimpleQ 
 * - a simple Promise, uses object create, setter/getter to watch for change
 * - examples provided in `example.js`
 */
function SimpleQ() {
    return new P();
    
    function P() {

        const promises = {
        }
        let __deferSet = null
        let __reject__set = null
        let __resolve__set = null       
        // const promiseCall = (condition = null, cb) => {

        //     // only allow these
        //     if(typeof cb ==='function' && !promises[condition] && 
        //         (condition==='resolve' || condition==='reject' )  ){
        //         promises[condition] =  {cb}
        //         return promises[condition]
        //     }      
        // }

        this.__resolve = new Promise((resolve, reject) => {
            promises['resolve']= resolve           
        })

        
        this.__reject = new Promise((resolve, reject) => {
            promises['reject']= reject
        })

     
        // set resolve or reject
        const setPromise = (condition = 'resolve') => {
            return Object.create({}, {
                [condition]: {
                    configurable: true,
                    enumerable: true,
                    get: () => {
                        return this[`__${condition}`]
           
                    },
                    set: (v) => {
                        // make callback on set with new data
                        if(!this[`__${condition}__set`]) {
                            promises[condition](v)
                            this[`__${condition}__set`] = true
                        }
                    }
                }
            })
        }
        const res = setPromise('resolve')
        const rej = setPromise('reject')

        this.resolve = (data = null) => {
            if (__deferSet) return this // already set
            res['resolve'] = data
            __deferSet = true
            return this
        }

        this.reject = (data = null) => {
            if (__deferSet) return this // already set
            rej['reject'] = data
           __deferSet = true
            return this
        }

        this.promise = async () => {
            // we only have resolve and reject
            // lets do lazy loop to wait for one to reoslve or reject first
            const resolution = (resolve,reject)=>{
                res['resolve'].then(resolve)
                rej['reject'].catch(reject)
            }
             return new Promise(resolution)
        }
    }
}

module.exports = SimpleQ