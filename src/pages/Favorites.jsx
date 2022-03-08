import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './components/Header';
import Loading from './components/Loading';
import MusicCard from './components/MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      songs: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ songs: favorites });
    // console.log(this.state.songs);
  }

  render() {
    const { songs } = this.state;
    return (
      <div className="favorites" data-testid="page-favorites">
        PÁGINA DE FAVORITOS
        <Header />
        <div>
          { songs.length > 0
            ? songs.map((track) => (
              <MusicCard
                key={ track.trackId }
                track={ track.trackName }
                URL={ track.previewUrl }
                id={ track.trackId }
                obj={ track }
              />
            ))
            : <Loading /> }
        </div>
      </div>
    );
  }
}

export default Favorites;
