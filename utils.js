exports.isFunction = (fn)=> !fn ? null: typeof fn==="function"
exports.isPromise = (P)=> ((typeof p==='object') || typeof p==='function') ? Promise.prototype === P.__proto__:false
exports.isArray = (arr)=> !arr ? null:Array.prototype === arr.__proto__