import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getUser, updateUser } from '../services/userAPI';
import Header from './components/Header';
import Loading from './components/Loading';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      userData: {},
      isBtnDisabled: true,
      fieldsValidations: {
        nameField: false,
        emailField: false,
        descriptionField: false,
        imageField: false,
      },
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    this.setState({ loading: true });
    const user = await getUser();
    this.setState({ userData: user, loading: false });
  }

  areInputsValid = () => {
    const { fieldsValidations:
      { nameField, emailField, descriptionField, imageField } } = this.state;
    if (nameField === true
      && emailField === true
      && descriptionField === true
      && imageField === true) {
      this.setState({ isBtnDisabled: false });
    } else {
      this.setState({ isBtnDisabled: true });
    }
  }

  handleInputsChange = ({ target: { name, value, id } }) => {
    const { userData, fieldsValidations } = this.state;
    const regexEmail = /[a-z]*@[a-z]*\.com/g;

    this.setState(Object.assign(userData, { [name]: value }),
      () => this.areInputsValid());

    if (name === 'email' && regexEmail.test(value)) {
      this.setState(Object.assign(fieldsValidations, { emailField: true }),
        () => this.areInputsValid());
    } else if ((
      name === 'name'
      || name === 'description'
      || name === 'image') && value.length > 0) {
      this.setState(Object.assign(fieldsValidations, { [id]: true }),
        () => this.areInputsValid());
    } else {
      this.setState(Object.assign(fieldsValidations, { [id]: false }));
    }
  }

  updateUserInfo = async () => {
    this.setState({ loading: true });
    const { userData } = this.state;
    await updateUser(userData);
    const { history } = this.props;
    history.push('/profile');
  }

  render() {
    const {
      userData: {
        name,
        email,
        description,
        image }, loading, isBtnDisabled } = this.state;
    return (
      <div className="edit" data-testid="page-profile-edit">
        PÁGINA DE EDIÇÃO DO PERFIL
        <Header />
        {loading
          ? <Loading />
          : (
            <div className="user">
              <div className="user-img">
                <img src={ image } alt={ name } />
                <label htmlFor="image">
                  <input
                    type="text"
                    name="image"
                    id="imageField"
                    value={ image }
                    onChange={ this.handleInputsChange }
                    data-testid="edit-input-image"
                  />
                </label>
              </div>
              <h3>Nome</h3>
              <label htmlFor="name">
                <input
                  type="text"
                  name="name"
                  id="nameField"
                  value={ name }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-name"
                />
              </label>
              <h3>Email</h3>
              <label htmlFor="email">
                <input
                  type="text"
                  name="email"
                  id="emailField"
                  value={ email }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-email"
                />
              </label>
              <h3>Descrição</h3>
              <label htmlFor="description">
                <input
                  type="text"
                  name="description"
                  id="descriptionField"
                  value={ description }
                  onChange={ this.handleInputsChange }
                  data-testid="edit-input-description"
                />
              </label>
              <button
                disabled={ isBtnDisabled }
                onClick={ this.updateUserInfo }
                type="button"
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
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ProfileEdit;
