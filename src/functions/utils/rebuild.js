import fetch from 'node-fetch'
import querystring from 'querystring'
const rebuild = email =>
  fetch(process.env.REBUILD_HOOK, {
    method: 'POST',
    body: querystring.stringify({
      trigger_title: `rebuild trigged by ${email}`,
    }),
  })
    .then(res => res.json()) // expecting a json response
    .then(json => console.log(json))

export default rebuild
