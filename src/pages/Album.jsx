import PropTypes from 'prop-types';
import React, { Component } from 'react';
import getMusics from '../services/musicsAPI';
import Header from './components/Header';
import Loading from './components/Loading';
import MusicCard from './components/MusicCard';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    this.fetchTracks();
  }

  fetchTracks = async () => {
    const { match: { params: { id } } } = this.props;
    const songs = await getMusics(id);
    this.setState({ tracks: songs });
    // console.log(this.state.tracks);
  }

  render() {
    const { tracks } = this.state;
    return (
      <div className="album" data-testid="page-album">
        PÁGINA DO ÁLBUM
        <Header />
        <h3>
          { tracks.length > 0
            ? (
              <>
                <img src={ tracks[0].artworkUrl100 } alt={ tracks[0].collectionName } />
                <p data-testid="artist-name">{tracks[0].artistName}</p>
                <p data-testid="album-name">{tracks[0].collectionName}</p>
              </>
            )
            : <Loading />}
          <MusicCard tracks={ tracks } />
        </h3>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
