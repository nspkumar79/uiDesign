import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import "./index.css";

const UserListItem = (props) => {
  const { eachItem, deleteUser, editUser, checkboxChanged } = props;
  const { name, email, role, id } = eachItem;

  const onEditClicked = () => {
    editUser(id);
  };

  const onDeleteClicked = () => {
    deleteUser(id);
  };

  const onChangeCheckbox = (event) => {
    checkboxChanged(id);
  };

  return (
    <>
      <li className="user-item-container">
        <input
          value={id}
          type="checkbox"
          className="user-checkbox"
          onChange={onChangeCheckbox}
        />
        <p className="user-name">{name}</p>
        <p className="user-email">{email}</p>
        <p className="user-role">{role}</p>
        <div className="user-action-container">
          <button type="button" className="edit-button" onClick={onEditClicked}>
            <BiEdit className="edit-icon" />
          </button>
          <button
            type="button"
            className="delete-button"
            onClick={onDeleteClicked}
          >
            <MdOutlineDeleteOutline className="delete-icon" />
          </button>
        </div>
      </li>
      <hr className="h-line" />
    </>
  );
};

export default UserListItem;
