####  SimpleQ 
[ Developed by Eaglex ](http://eaglex.net)

##### LICENSE
* LICENCE: **CC BY-SA**

* SOURCE: https://creativecommons.org/licenses/by/4.0/legalcode

#### About
SimpleQ is a promise library, similar to `Q` library, but uses simpler concept of data deferring, with same behavior, and no external libraries.

- works with **Node.js** and **Browser**

#### Examples
- examples available at `./example.js`

#### Usage
```js
// esm version use import {sq} from './sq/es'
const sq =  SimpleQ()

  setTimeout(() => {
        // will never fire
        sq.reject({ data: 123, value: 'return as rejected' })  
    }, 2000)

  setTimeout(() => {
        sq.resolve({ data: 123, value: 'return as resolved' })
    },1000)
	
sq.promise().then(z  => {
	// NOTE nice!
	console.log('[resolve]', z)
}, err  => {
	console.log('[reject]', err)
})
```

#### Files
- `./simple-q.js`
- `./es.js` esm version support

Thank you