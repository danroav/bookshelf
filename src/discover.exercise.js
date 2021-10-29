/** @jsx jsx */
import {jsx} from '@emotion/core'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
// 🐨 import the client from './utils/api-client'
import {client} from 'utils/api-client'
import {useEffect, useState} from 'react'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'

function DiscoverBooksScreen() {
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
  // 🐨 add state for status ('idle', 'loading', or 'success'), data, and query
  // const [status, setStatus] = useState('idle')
  // const [data, setData] = useState()
  const [query, setQuery] = useState()
  //const data = null // 💣 remove this, it's just here so the example doesn't explode
  // 🐨 you'll also notice that we don't want to run the search until the
  // user has submitted the form, so you'll need a boolean for that as well
  // 💰 I called it "queried"
  const [queried, setQueried] = useState(false)
  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  useEffect(() => {
    console.log('useEffect start')
    const endPoint = `books?query=${encodeURIComponent(query)}`
    if (!queried) {
      console.log('useEffect end because of not queried')
      return
    }
    //setStatus('loading')
    console.log('starting client fetch')
    // client(endPoint)
    //   .then(fetchData => {
    //     console.log('Data fetched', fetchData)
    //     setData(fetchData)
    //     setStatus('success')
    //   })
    //   .catch(error => {
    //     console.log('Data fetch Error: ', error)
    //     setData(error)
    //     setStatus('error')
    //   })
    run(client(endPoint))
    console.log('useEffect end no dispose callback returned')
  }, [queried, query, run])
  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).

  // 🐨 replace these with derived state values based on the status.
  // const isLoading = status === 'loading'
  // const isSuccess = status === 'success'
  // const isError = status === 'error'
  console.log(
    'Return component. Is loading: ',
    isLoading,
    ' Is success: ',
    isSuccess,
    ' Is error: ',
    isError,
  )
  console.log('data:', data, 'error:', error)
  function handleSearchSubmit(event) {
    // 🐨 call preventDefault on the event so you don't get a full page reload
    event.preventDefault()
    // 🐨 set the queried state to true
    setQueried(true)
    console.log('set queried true')
    // 🐨 set the query value which you can get from event.target.elements
    setQuery(event.target.elements.search.value)
    console.log('set query')
    // 💰 console.log(event.target.elements) if you're not sure.
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}

      {isError ? (
        <div css={{color: colors.danger}}>
          <p>There was an error:</p>
          <pre>{error.message}</pre>
        </div>
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
