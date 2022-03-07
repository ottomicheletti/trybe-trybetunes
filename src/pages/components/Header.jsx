import React, { Component } from 'react';
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
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ username }</p>}
      </header>
    );
  }
}

export default Header;
