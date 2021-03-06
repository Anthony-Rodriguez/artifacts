import React, { Component, Fragment } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      artifacts: null
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props
    axios({
      url: `${apiUrl}/home/`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${user.token}`
      }
    })
      .then(res => {
        this.setState({ artifacts: res.data.artifacts })
        return res
      })
      .catch(error => {
        msgAlert({
          heading: 'I thought they would be here...',
          message: 'This doesn\'t look right: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    let artifactJsx
    if (this.state.artifacts === null) {
      artifactJsx = <Spinner animation="border" variant="primary"/>
    } else if (this.state.artifacts === 0) {
      artifactJsx = 'You realize you haven\'t made anything ... right?'
    } else {
      const artifactList = this.state.artifacts.reverse().map(artifact => {
        const rarityColor = artifact.rarity === '1' ? 'common-color' : (
          artifact.rarity === '2' ? 'uncommon-color' : (
            artifact.rarity === '3' ? 'rare-color' : (
              artifact.rarity === '4' ? 'very-rare-color' : (
                artifact.rarity === '5' ? 'legendary-color' : (
                  artifact.rarity === '6' ? 'artifact-color' : 'unknown-rarity-color'
                )))))
        return (
          <div key={artifact.id} className="row artifact-info">
            <div className="artifact-name-rarity col-3">
              <Link to={`/artifacts/${artifact.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className={`artifact-name ${rarityColor}`}>
                  <p>{artifact.name}</p>
                </span>
              </Link>
              <span className="artifact-rarity">
                <p><i>{artifact.rarity_display}</i></p>
              </span>
            </div>
            <div className="artifact-category col-2">
              <p>{artifact.category_display}</p>
            </div>
            <div className="artifact-attunement col-3">
              <p>Attunment Requirement: {String(artifact.attunement)}</p>
            </div>
            <div className="artifact-description col-4">
              <p>{artifact.description}</p>
            </div>
          </div>
        )
      })
      artifactJsx = (
        <ul>
          {artifactList}
        </ul>
      )
    }
    return (
      <Fragment>
        <div className="row">
          <div className="col-12 mt-3 no-pad-sides">
            <h2 style={{ textAlign: 'center' }}>Artifacts</h2>
            <div className="col-12 mt-3">
              {artifactJsx}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Home
