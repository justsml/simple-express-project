$.get('http://foo.bar')
  .then(res => console.log('results', res))

fetch('http://foo.bar', {body: JSON.stringify({title: 'Goodnight Moon'}), method: 'put'})
  .then(res => res.json())
  .then(res => console.log('results', res))
