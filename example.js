`use strict`

const SimpleQ = require('./simple-q')

// returns reject value
function example_one() {

    const sq = SimpleQ()

    sq.reject({ data: 123, value: 'return as rejected' })

    setTimeout(() => {
        sq.resolve('some data') // will never fire, reject already set
    }, 1000)

    sq.promise().then(z => {
        console.log('[resolve]', z)
    }, err => {

        // NOTE nice!
        console.log('--- example_one ---')
        console.log('[reject]', err)
        console.log(' ')
    })
}
// returns resolve value
function example_two() {

    const sq = SimpleQ()

    setTimeout(() => {
        // will never fire
        sq.reject({ data: 123, value: 'return as rejected' })
    }, 2000)

    setTimeout(() => {
        sq.resolve({ data: 123, value: 'return as resolved' })
    }, 1000)

    sq.promise().then(z => {

        // NOTE nice!
        console.log('--- example_two ---')
        console.log(`[resolve]`, z)
        console.log(' ')
    }, err => {
        console.log('[reject]', err)
    })
}

example_one()
example_two()

