function client(endpoint, customConfig = {}) {
  // 🐨 create the config you'll pass to window.fetch
  //    make the method default to "GET"
  const config = {
    method: 'GET',
    ...customConfig,
  }
  const resource = `${process.env.REACT_APP_API_URL}/${endpoint}`

  return window.fetch(resource, config).then(async response => {
    console.log('client response received')
    const data = await response.json()
    if (!response.ok) {
      // const error = new Error(await response.text())
      // console.log('client error thrown', error)
      // throw error
      return Promise.reject(data)
    }
    console.log('client json returned')
    return data
  })
  // 💰 if you're confused by this, that's fine. Scroll down to the bottom
  // and I've got some code there you can copy/paste.
  // 🐨 call window.fetch(fullURL, config) then handle the json response
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  // 💰 here's how to get the full URL: `${process.env.REACT_APP_API_URL}/${endpoint}`
}

export {client}

/*






























💰 spoiler alert below...



























































const config = {
    method: 'GET',
    ...customConfig,
  }
*/
