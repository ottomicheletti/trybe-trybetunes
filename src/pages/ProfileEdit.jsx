import React, { Component } from 'react';
import Header from './components/Header';

class ProfileEdit extends Component {
  render() {
    return (
      <div className="edit" data-testid="page-profile-edit">
        PÁGINA DE EDIÇÃO DO PERFIL
        <Header />
      </div>
    );
  }
}

export default ProfileEdit;
