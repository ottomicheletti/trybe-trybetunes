import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userData: {},
    };
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ loading: false, userData: user });
  }

  render() {
    const { userData, loading } = this.state;
    return (
      <div className="profile" data-testid="page-profile">
        PÁGINA DO PERFIL
        <Header />
        <div>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
        {loading
          ? <Loading />
          : (
            <div className="user">
              <div className="user-img">
                <img
                  src={ userData.image }
                  alt={ userData.name }
                  data-testid="profile-image"
                />
              </div>
              <h3>Nome</h3>
              <p>{userData.name}</p>
              <h3>Email</h3>
              <p>{userData.email}</p>
              <h3>Descrição</h3>
              <p>{userData.description}</p>
            </div>)}
      </div>
    );
  }
}

export default Profile;
