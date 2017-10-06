let user = {name: 'jimbo'}
const overrides = {active: false, }
const defaults = {portrait: 'http://....'}

user = Object.assign({}, defaults, user, overrides)
