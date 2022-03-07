import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  render() {
    return (
      <div className="search" data-testid="page-search">
        PÁGINA DE BUSCA
        <Header />
      </div>
    );
  }
}

export default Search;
