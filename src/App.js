import { useState, useEffect } from "react"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import "./styles/styles.css"
import { Container, Alert, Dropdown } from "react-bootstrap"
import MyNavbar from "./components/MyNavbar"
import MyFooter from "./components/MyFooter"
import MovieList from "./components/MovieList"

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
    <BrowserRouter
    <div>
      <MyNavbar showSearchResult={showSearchResult} />
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <h2 className="mb-4">TV Shows</h2>
            <div className="ml-4 mt-1">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: "#221f1f" }}
                  id="dropdownMenuButton"
                  className="btn-secondary btn-sm dropdown-toggle rounded-0"
                >
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu bg="dark">
                  <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            <i className="fa fa-th-large icons"></i>
            <i className="fa fa-th icons"></i>
          </div>
        </div>
        {isError && (
          <Alert variant="danger" className="text-center">
            An error has occurred, please try again!
          </Alert>
        )}
        {searchResults?.length > 0 && <MovieList title="Search results" movies={searchResults} />}
        {!isError && !searchResults?.length > 0 && (
          <>
            <MovieList title="Harry Potter" loading={isLoading} movies={gallery1.slice(0, 6)} />
            <MovieList title="The Avengers" loading={isLoading} movies={gallery2.slice(0, 6)} />
            <MovieList title="Star Wars" loading={isLoading} movies={gallery3.slice(0, 6)} />
          </>
        )}
        <MyFooter />
      </Container>
    </div>
  )
}

export default App
