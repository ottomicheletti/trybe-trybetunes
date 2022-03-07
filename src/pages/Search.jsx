import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      btnDisabled: true,
    };
  }

  handleChange = ({ target: { value } }) => {
    const DOIS = 2;
    if (value.length >= DOIS) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  render() {
    const { btnDisabled } = this.state;
    return (
      <div className="search" data-testid="page-search">
        PÁGINA DE BUSCA
        <Header />
        <div className="query">
          <input
            type="text"
            name=""
            id=""
            onChange={ this.handleChange }
            data-testid="search-artist-input"
          />
          <button
            disabled={ btnDisabled }
            type="submit"
            data-testid="search-artist-button"
          >
            Pesquisar
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
