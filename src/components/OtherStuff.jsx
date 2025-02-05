import { Container, Alert, Dropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

const OtherStuff = ({ error }) => {
  return (
    <Container fluid className="px-4">
      <div>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Link to="/tvshows"> TV SHOWS</Link>
          </div>

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
      {error && (
        <Alert variant="danger" className="text-center">
          An error has occurred, please try again!
        </Alert>
      )}
    </Container>
  )
}

export default OtherStuff
