`use strict`

const SimpleQ = require('./simple-q')

// returns reject value
function example_one() {

    const sq = SimpleQ()
    sq.reject({ data: 123, value: 'return as rejected' })
    sq.resolve('some data') // will never fire, reject already set

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
    sq.resolve({ data: 123, value: 'return as resolved' })
    sq.reject({ data: 123, value: 'return as rejected' }) // will never fire, resolved already set
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

