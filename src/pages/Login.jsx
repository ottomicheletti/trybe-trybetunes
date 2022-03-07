import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createUser } from '../services/userAPI';
import Loading from './components/Loading';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      btnDisabled: true,
      user: '',
      loading: false,
    };
  }

  handleChange = ({ target: { value } }) => {
    const TRES = 3;
    this.setState({ user: value });
    if (value.length >= TRES) {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  }

  handleClick = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({ loading: true });
    await createUser({ name: `${user}` });
    history.push('/search');
  }

  render() {
    const { btnDisabled, loading } = this.state;
    return (
      <div className="login" data-testid="page-login">
        { loading
          ? <Loading />
          : (
            <div>
              <input
                type="text"
                name=""
                id=""
                onChange={ this.handleChange }
                data-testid="login-name-input"
              />
              <button
                type="submit"
                disabled={ btnDisabled }
                onClick={ this.handleClick }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </div>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Login;
