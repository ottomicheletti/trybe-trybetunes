import PropTypes, { any } from 'prop-types';
import React, { Component } from 'react';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     checked: false,
  //   };
  // }

  checked = async ({ target }, obj) => {
    if (target.checked) {
      // this.setState({ checked: true });
      await addSong(obj);
    }
    if (!target.checked) {
      // this.setState({ checked: false });
      await removeSong(obj);
    }
  }

  render() {
    const { track, URL, id, obj } = this.props;
    // const { checked } = this.state;
    return (
      // <div>
      //   {
      //     loading
      //       ? <Loading />
      //       : (
      <div>
        <h2>{track}</h2>
        <audio data-testid="audio-component" src={ URL } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="add-song">
          <input
            type="checkbox"
            name="add-song"
            // checked={ checked }
            onChange={ (event) => this.checked(event, obj) }
            data-testid={ `checkbox-music-${id}` }
          />
          Favorita
        </label>
      </div>
      //       )
      //   }
      // </div>
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
