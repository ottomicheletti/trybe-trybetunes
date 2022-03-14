import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
    };
  }

  async componentDidMount() {
    const { loading } = this.state;
    if (loading) {
      this.fetchUser();
    }
  }

  fetchUser = async () => {
    const { name, email, description, image } = await getUser();
    this.setState({ loading: false, name, email, description, image });
  }

  render() {
    const {
      name,
      email,
      description,
      image,
      loading,
    } = this.state;
    return (
      <div className="profile" data-testid="page-profile">
        PÁGINA DO PERFIL
        <Header />
        <Link to="/profile/edit">Editar perfil</Link>
        {loading
          ? <Loading />
          : (
            <div className="user">
              <div className="user-img">
                <img
                  src={ image }
                  alt={ name }
                  data-testid="profile-image"
                />
              </div>
              <h3>Nome</h3>
              <p>{name}</p>
              <h3>Email</h3>
              <p>{email}</p>
              <h3>Descrição</h3>
              <p>{description}</p>
            </div>)}
      </div>
    );
  }
}

export default Profile;
