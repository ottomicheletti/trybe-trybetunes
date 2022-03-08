import PropTypes, { any } from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: [],
    };
  }

  componentDidMount() {
    this.favoriteTracks();
  }

  componentDidUpdate() {
    this.favoriteTracks();
  }

  favoriteTracks = async () => {
    const favoriteTracks = await getFavoriteSongs();
    this.setState({ checked: favoriteTracks });
  }

  checkFavorite = async ({ target }) => {
    const { tracks } = this.props;
    const { checked } = this.state;
    const checkedTrack = tracks
      .find((track) => track.trackId === parseInt(target.value, 10));

    // console.log(checkedTrack);

    this.setState({
      loading: true,
    });

    return checked.some((track) => track.trackId === parseInt(target.value, 10))
      ? (await removeSong(checkedTrack), this.setState({ loading: false }))
      : (await addSong(checkedTrack), this.setState({ loading: false }));
  }

  render() {
    const { tracks } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading
          ? <Loading />
          : (
            tracks.filter((_track, index) => index > 0).map((track) => (
              <div key={ track.trackId }>
                <p>{track.trackName}</p>
                <audio
                  data-testid="audio-component"
                  src={ track.previewUrl }
                  controls
                >
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
                <br />
                <label htmlFor="add-song">
                  <input
                    type="checkbox"
                    name="add-song"
                    value={ track.trackId }
                    onChange={ this.checkFavorite }
                    checked={ checked.some((id) => id.trackId === track.trackId) }
                    data-testid={ `checkbox-music-${track.trackId}` }
                  />
                  Favorita
                </label>
              </div>
            ))

        // <div>
        //   <h2>{track}</h2>
        //   <audio data-testid="audio-component" src={ URL } controls>
        //     <track kind="captions" />
        //     O seu navegador não suporta o elemento
        //     {' '}
        //     <code>audio</code>
        //     .
        //   </audio>
        //   <label htmlFor="add-song">
        //     <input
        //       type="checkbox"
        //       name="add-song"
        //       onChange={ (event) => this.checked(event, obj) }
        //       data-testid={ `checkbox-music-${id}` }
        //     />
        //     Favorita
        //   </label>
        // </div>
          )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.string,
  URL: PropTypes.string,
  id: PropTypes.number,
  obj: PropTypes.shape(any),
}.isRequired;

export default MusicCard;
