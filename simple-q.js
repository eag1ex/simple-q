`use strict`
/**
 * SimpleQ
 * Developer: Eaglex ( http://eaglex.net ) 
 * License: CC BY-SA ( https://creativecommons.org/licenses/by/4.0/legalcode )
 * - Simple Promise, uses object.create, setter/getter to watch for change
 */
function SimpleQ() {
    
    return new function() {
        const promises = {}
        let __deferSet = null
        let __reject__set = null
        let __resolve__set = null       

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

        this.promise = () => {
            // lets lazy wait for one to resolve or reject first
            const resolution = (resolve,reject)=>{
                res['resolve'].then(resolve)
                rej['reject'].catch(reject)
            }
             return new Promise(resolution)
        }
    }
}

module.exports = SimpleQ