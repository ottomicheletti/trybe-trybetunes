import PropTypes, { any } from 'prop-types';
import React, { Component } from 'react';
import { addSong } from '../../services/favoriteSongsAPI';

class MusicCard extends Component {
  checked = ({ target }, obj) => target.checked && addSong(obj);

  render() {
    const { track, URL, id, obj } = this.props;
    return (
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
            onClick={ (event) => this.checked(event, obj) }
            data-testid={ `checkbox-music-${id}` }
          />
          Favorita
        </label>
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
