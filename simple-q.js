`use strict`
/**
 * SimpleQ 
 * - a simple Promise, uses object create, setter/getter to watch for change
 * - examples provided in `example.js`
 */
function SimpleQ() {
    return new P();
    
    function P() {
        this.__deferSet = null
        this.__reject = undefined
        this.__resolve = undefined

        // set resolve or reject
        const setPromise = (condition = 'resolve') => {
            return Object.create({}, {
                [condition]: {
                    configurable: true,
                    enumerable: true,
                    get: () => this[`__${condition}`],
                    set: (v) => {
                        if (this[`__${condition}`] !== undefined) return
                        this[`__${condition}`] = new Promise((resolve, reject) => {
                            if (condition === 'resolve') return resolve(v)
                            if (condition === 'reject') return reject(v)
                        })
                    }
                }
            })
        }
        const res = setPromise('resolve')
        const rej = setPromise('reject')

        this.resolve = (data = true) => {
            if (this.__deferSet) return this // already set
            res['resolve'] = data
            this.__deferSet = true
            return this
        }

        this.reject = (data = true) => {
            if (this.__deferSet) return this // already set
            rej['reject'] = data
            this.__deferSet = true
            return this
        }

        this.promise = () => {
            const resolutions = (() => [].concat([res['resolve'], rej['reject']].filter(z => z !== undefined)))()

            return Promise.all(resolutions).then(z => {
                for (let i = 0; i < z.length; i++) {
                    if (z[i] !== undefined) return z[i]
                    else return Promise.reject(z[i])
                }
            })
        }
    }
}

module.exports = SimpleQ