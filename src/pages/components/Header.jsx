import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      loading: true,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ username: user.name });
    this.setState({ loading: false });
  }

  render() {
    const { username, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div className="user">
          { loading
            ? <Loading />
            : <p data-testid="header-user-name">{ username }</p>}
        </div>
        <nav>
          <Link
            to="/search"
            data-testid="link-to-search"
            className="btn"
          >
            Busca
          </Link>
          <Link
            to="/favorites"
            data-testid="link-to-favorites"
            className="btn"
          >
            Favoritos
          </Link>
          <Link
            to="/profile"
            data-testid="link-to-profile"
            className="btn"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
