`use strict`
/**
 * SimpleQ
 * Developer: Eaglex ( http://eaglex.net ) 
 * License: CC BY-SA ( https://creativecommons.org/licenses/by/4.0/legalcode )
 * - Simple Promise defer
 */
function SimpleQ() {
    
    return new function() {
        const promises = {}     
        let __deferSet = null   
        const defer =  new Promise((resolve, reject) => {
            promises['resolve']= resolve      
            promises['reject']= reject     
        })

        this.resolve = (data = null) => {
            if (__deferSet) return this // already set
            promises['resolve'](data)
            __deferSet = true
            return this
        }

        this.reject = (data = null) => {
            if (__deferSet) return this // already set
            promises['reject'](data)
           __deferSet = true
            return this
        }

        this.promise = () =>  defer     
    }
}

module.exports = SimpleQ