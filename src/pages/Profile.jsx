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
    this.fetchUser();
  }

  fetchUser = async () => {
    const { loading } = this.state;
    if (loading) {
      const { name, email, description, image } = await getUser();
      this.setState({ name, email, description, image });
    }
    this.setState({ loading: false });
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
