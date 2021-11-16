import { BiEdit } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import "./index.css";

const UserListItem = (props) => {
  const { eachItem, deleteUser, editUser, checkboxChanged } = props;
  const { name, email, role, id, isChecked } = eachItem;

  const listItemClassName = isChecked
    ? "user-item-container-active"
    : "user-item-container-inactive";

  const onEditClicked = () => {
    editUser(id);
  };

  const onDeleteClicked = () => {
    deleteUser(id);
  };

  const onChangeCheckbox = (event) => {
    checkboxChanged(event);
  };

  return (
    <>
      <li className={listItemClassName}>
        <input
          value={id}
          type="checkbox"
          className="user-checkbox"
          onChange={onChangeCheckbox}
          checked={isChecked}
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
    </>
  );
};

export default UserListItem;
