import React, { Component } from 'react';
import Header from './components/Header';

class Favorites extends Component {
  render() {
    return (
      <div className="favorites" data-testid="page-favorites">
        PÁGINA DE FAVORITOS
        <Header />
      </div>
    );
  }
}

export default Favorites;
