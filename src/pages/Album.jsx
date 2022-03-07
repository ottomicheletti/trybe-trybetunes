import React, { Component } from 'react';
import Header from './components/Header';

class Album extends Component {
  render() {
    return (
      <div className="album" data-testid="page-album">
        PÁGINA DO ÁLBUM
        <Header />
      </div>
    );
  }
}

export default Album;
