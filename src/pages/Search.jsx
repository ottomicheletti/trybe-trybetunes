import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from './components/Header';
import Loading from './components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
      loading: false,
      showCards: false,
      artist: '',
      albuns: '',
      inputValue: '',
    };
  }

  handleChange = ({ target: { value } }) => {
    const DOIS = 2;
    this.setState({
      artist: value,
      inputValue: value,
    });
    if (value.length >= DOIS) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ loading: true });
    const resp = await searchAlbumsAPI(artist);
    if (resp.length > 0) {
      this.setState({
        albuns: resp,
        loading: false,
        showCards: true,
        inputValue: '',
      });
    } else {
      this.setState({
        albuns: undefined,
        loading: false,
        showCards: false,
        inputValue: '',
      });
    }
  }

  render() {
    const { btnDisabled, loading, showCards, artist, albuns, inputValue } = this.state;
    let test = null;
    if (!albuns) {
      test = <p>Nenhum álbum foi encontrado</p>;
    }
    if (loading && !showCards) {
      test = <Loading />;
    } else if (!loading && showCards) {
      test = (
        <>
          <p>{`Resultado de álbuns de: ${artist}`}</p>
          <div className="card-display">
            { albuns.map((album) => (
              <Link
                key={ album.collectionId }
                to={ `/album/${album.collectionId}` }
                className="card"
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                <img src={ album.artworkUrl100 } alt="" srcSet="" />
                <p>{album.collectionName}</p>
              </Link>
            )) }
          </div>
        </>
      );
    }

    return (
      <div className="search" data-testid="page-search">
        PÁGINA DE BUSCA
        <Header />

        <div className="query">
          <input
            type="text"
            name=""
            id=""
            value={ inputValue }
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            disabled={ btnDisabled }
            type="submit"
            onClick={ this.handleClick }
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>

        <div className="display">
          {test}
        </div>

      </div>
    );
  }
}

export default Search;
