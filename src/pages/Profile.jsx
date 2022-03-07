import React, { Component } from 'react';
import Header from './components/Header';

class Profile extends Component {
  render() {
    return (
      <div className="profile" data-testid="page-profile">
        PÁGINA DO PERFIL
        <Header />
      </div>
    );
  }
}

export default Profile;
