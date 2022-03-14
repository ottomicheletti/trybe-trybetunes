import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name: '',
      email: '',
      description: '',
      image: '',
      isBtnDisabled: true,
    };
  }

  componentDidMount() {
    const { isBtnDisabled } = this.state;
    if (isBtnDisabled) {
      this.fetchUser();
    }
  }

  areInputsValid = async () => {
    const { name, email, description, image } = this.state;
    const regexEmail = /[a-z]*@[a-z]*\.com/g;
    if (name !== ''
      && regexEmail.test(email)
      && description !== ''
      && image !== '') {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleInputsChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value },
      () => this.areInputsValid());
  }

  redirectUser = () => {
    const { name, email, description, image } = this.state;
    const { history } = this.props;
    updateUser({
      name,
      email,
      description,
      image,
    }).then(history.push('/profile'));
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
      isBtnDisabled,
    } = this.state;
    return (
      <div className="edit" data-testid="page-profile-edit">
        PÁGINA DE EDIÇÃO DO PERFIL
        <Header />
        {loading
          ? <Loading />
          : (
            <div className="user">
              <label htmlFor="name">
                Nome
                <input
                  type="text"
                  name="name"
                  id="nameField"
                  value={ name }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-name"
                />
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="text"
                  name="email"
                  id="emailField"
                  value={ email }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-email"
                />
              </label>
              <label htmlFor="description">
                Descrição
                <input
                  type="text"
                  name="description"
                  id="descriptionField"
                  value={ description }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-description"
                />
              </label>
              <label htmlFor="image">
                URL da imagem
                <input
                  type="text"
                  name="image"
                  id="imageField"
                  value={ image }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-image"
                />
              </label>
              <button
                disabled={ isBtnDisabled }
                onClick={ this.redirectUser }
                type="submit"
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </div>)}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
