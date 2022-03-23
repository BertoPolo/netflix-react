import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import "./styles/styles.css"
import MyNavbar from "./components/MyNavbar"
import MyFooter from "./components/MyFooter"
import MovieList from "./components/MovieList"
import OtherStuff from "./components/OtherStuff"

const App = () => {
  /*   state = {
    gallery1: [],
    gallery2: [],
    gallery3: [],
    searchResults: [],
    loading: true,
    error: false,
  }; */

  const [gallery1, setGallery1] = useState([])
  const [gallery2, setGallery2] = useState([])
  const [gallery3, setGallery3] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const OMDB_URL = "http://www.omdbapi.com/?apikey=24ad60e9"

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = async () => {
    Promise.all([
      fetch(OMDB_URL + "&s=harry%20potter")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery1(responseObject.Search)
          } else {
            setIsError(true)
          }
        }),
      fetch(OMDB_URL + "&s=avengers")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery2(responseObject.Search)
          } else {
            setIsError(true)
          }
        }),
      fetch(OMDB_URL + "&s=star%20wars")
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === "True") {
            setGallery3(responseObject.Search)
          } else {
            setIsError(true)
          }
        }),
    ])
      .then(() => setIsLoading(false))
      .catch((err) => {
        setIsError(true)

        console.log("An error has occurred:", err)
      })
  }

  const showSearchResult = async (searchString) => {
    if (searchString === "") {
      setIsError(false)
      setSearchResults([])
      fetchMovies()
    } else {
      try {
        const response = await fetch(OMDB_URL + "&s=" + searchString)
        if (response.ok) {
          const data = await response.json()
          if (data.Response === "True") {
            setSearchResults(data.Search)
            setIsError(false)
          } else {
            setIsError(true)
          }
        } else {
          setIsError(true)
          console.log("an error occurred")
        }
      } catch (error) {
        setIsError(true)
        console.log(error)
      }
    }
  }

  return (
    <BrowserRouter>
      <MyNavbar showSearchResult={showSearchResult} />

      <Routes>
        {/* <OtherStuff /> */}

        {searchResults?.length > 0 && <Route path="/movielist/:id" element={<MovieList title="Search results" movies={searchResults} />} />}
        {!isError && !searchResults?.length > 0 && (
          <>
            <Route path="/movielist/Harry Potter" element={<MovieList title="Harry Potter" loading={isLoading} movies={gallery1.slice(0, 6)} />} />
            <Route path="/movielist/The Avengers" element={<MovieList title="The Avengers" loading={isLoading} movies={gallery2.slice(0, 6)} />} />
            <Route path="/movielist/Star Wars" element={<MovieList title="Star Wars" loading={isLoading} movies={gallery3.slice(0, 6)} />} />
          </>
        )}
      </Routes>
      {/* <MyFooter /> */}
    </BrowserRouter>
  )
}

export default App
