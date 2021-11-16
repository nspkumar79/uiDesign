import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Component } from "react";

import "./index.css";

class UserListItem extends Component {
  state = { isEditClicked: false, editedUser: {}, isSaveClicked: false };

  onEditClicked = () => {
    const { eachItem } = this.props;
    const { name, email, role, id, isChecked } = eachItem;
    this.setState({
      isEditClicked: true,
      editedUser: {
        id: id,
        name: name,
        email: email,
        role: role,
        isChecked: isChecked,
      },
    });
  };

  onDeleteClicked = () => {
    const { deleteUser, eachItem } = this.props;
    const { id } = eachItem;
    deleteUser(id);
  };

  onChangeCheckbox = (event) => {
    const { checkboxChanged } = this.props;
    checkboxChanged(event);
  };

  changeName = (event) => {
    this.setState((prevState) => ({
      editedUser: { ...prevState.editedUser, name: event.target.value },
    }));
  };

  changeEmail = (event) => {
    this.setState((prevState) => ({
      editedUser: { ...prevState.editedUser, email: event.target.value },
    }));
  };

  changeRole = (event) => {
    this.setState((prevState) => ({
      editedUser: { ...prevState.editedUser, role: event.target.value },
    }));
  };

  updateEditedUser = () => {
    const { editUser } = this.props;
    const { editedUser } = this.state;
    editUser(editedUser);
  };

  onSaveClicked = () => {
    this.setState(
      { isSaveClicked: true, isEditClicked: false },
      this.updateEditedUser
    );
  };

  render() {
    const { isEditClicked } = this.state;
    const { eachItem } = this.props;
    const { name, email, role, isChecked } = eachItem;
    const listItemClassName = isChecked
      ? "user-item-container-active"
      : "user-item-container-inactive";

    return (
      <>
        {isEditClicked ? (
          <li className={listItemClassName}>
            <input
              type="text"
              className="name-input"
              placeholder={name}
              onChange={this.changeName}
            />
            <input
              type="text"
              className="email-input"
              placeholder={email}
              onChange={this.changeEmail}
            />
            <input
              type="text"
              className="role-input"
              placeholder={role}
              onChange={this.changeRole}
            />
            <div className="save-button-container">
              <button
                type="button"
                className="save-button"
                onClick={this.onSaveClicked}
              >
                Save
              </button>
            </div>
          </li>
        ) : (
          <li className={listItemClassName}>
            <input
              value={name}
              type="checkbox"
              className="user-checkbox"
              onChange={this.onChangeCheckbox}
              checked={isChecked}
            />
            <p className="user-name">{name}</p>
            <p className="user-email">{email}</p>
            <p className="user-role">{role}</p>
            <div className="user-action-container">
              <button
                type="button"
                className="edit-button"
                onClick={this.onEditClicked}
              >
                <BiEdit className="edit-icon" />
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={this.onDeleteClicked}
              >
                <MdOutlineDeleteOutline className="delete-icon" />
              </button>
            </div>
          </li>
        )}
      </>
    );
  }
}

export default UserListItem;
