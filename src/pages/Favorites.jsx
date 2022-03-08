import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from './components/Header';
import MusicCard from './components/MusicCard';

class Favorites extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    this.fetchFavoriteSongs();
  }

  componentDidUpdate() {
    this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ tracks: favorites });
  }

  render() {
    const { tracks } = this.state;
    return (
      <div className="favorites" data-testid="page-favorites">
        PÁGINA DE FAVORITOS
        <Header />
        <div>
          <MusicCard tracks={ tracks } />
        </div>
      </div>
    );
  }
}

export default Favorites;
