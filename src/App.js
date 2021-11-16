import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { Component } from "react";
import UserListItem from "./Components/UserListItem";
import "./App.css";

class App extends Component {
  state = {
    usersList: [],
    activePage: 1,
    filteredUsersList: [],
    activePageUsers: [],
    allSelectCheckbox: false,
  };

  componentDidMount() {
    this.getUsers();
  }

  renderUpdatedFetchedData = (data) => ({
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    isChecked: false,
  });

  getUsers = async () => {
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      const updatedFetchedData = fetchedData.map((eachItem) =>
        this.renderUpdatedFetchedData(eachItem)
      );
      this.setState({
        usersList: updatedFetchedData,
        filteredUsersList: updatedFetchedData,
        activePageUsers: updatedFetchedData.slice(0, 10),
      });
    }
  };

  updateActivePageUsers = () => {
    const { activePage, filteredUsersList } = this.state;
    const lowerIndex = (activePage - 1) * 10;
    const upperIndex = activePage * 10;

    const updatedFilteredUserList = filteredUsersList.slice(
      lowerIndex,
      upperIndex
    );
    this.setState({ activePageUsers: updatedFilteredUserList });
  };

  onFirstPageClicked = () => {
    this.setState({ activePage: 1 }, this.updateActivePageUsers);
  };

  onPreviousPageClicked = () => {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.setState(
        (prev) => ({ activePage: prev.activePage - 1 }),
        this.updateActivePageUsers
      );
    }
  };

  onNextPageClicked = () => {
    const { activePage, filteredUsersList } = this.state;
    const usersListCount = filteredUsersList.length;
    const upperPaginationNumber = Math.ceil(usersListCount / 10);
    if (activePage < upperPaginationNumber) {
      this.setState(
        (prev) => ({ activePage: prev.activePage + 1 }),
        this.updateActivePageUsers
      );
    }
  };

  onLastPageClicked = () => {
    const { filteredUsersList } = this.state;
    const usersListCount = filteredUsersList.length;
    const upperPaginationNumber = Math.ceil(usersListCount / 10);
    this.setState(
      { activePage: upperPaginationNumber },
      this.updateActivePageUsers
    );
  };

  onChangeSearchInput = (event) => {
    const { usersList } = this.state;
    const searchInput = event.target.value;
    const filteredUsersList = usersList.filter(
      (user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.email.toLowerCase().includes(searchInput.toLowerCase()) ||
        user.role.toLowerCase().includes(searchInput.toLowerCase())
    );
    this.setState(
      {
        filteredUsersList: filteredUsersList,
        activePage: 1,
      },
      this.updateActivePageUsers
    );
  };

  allCheckboxChanged = (event) => {
    const { activePageUsers } = this.state;
    activePageUsers.forEach((user) => (user.isChecked = event.target.checked));
    this.setState({
      activePageUsers: activePageUsers,
      allSelectCheckbox: event.target.checked,
    });
  };

  checkboxChanged = (event) => {
    const { activePageUsers } = this.state;
    activePageUsers.forEach((user) =>
      user.name === event.target.value
        ? (user.isChecked = event.target.checked)
        : null
    );
    this.setState({
      activePageUsers: activePageUsers,
    });
  };

  deleteUser = (id) => {
    const { usersList, filteredUsersList } = this.state;
    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => user.id !== id
    );
    const updatedUsersList = usersList.filter((user) => user.id !== id);
    this.setState(
      {
        usersList: updatedUsersList,
        filteredUsersList: updatedFilteredUsersList,
      },
      this.updateActivePageUsers
    );
  };

  onDeleteSelected = () => {
    const { usersList, filteredUsersList } = this.state;
    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => user.isChecked === false
    );
    const updatedUsersList = usersList.filter(
      (user) => user.isChecked === false
    );
    this.setState(
      (prev) => ({
        allSelectCheckbox: prev.allSelectCheckbox ? false : false,
        usersList: updatedUsersList,
        filteredUsersList: updatedFilteredUsersList,
      }),
      this.updateActivePageUsers
    );
  };

  editUser = (editedUser) => {
    const { usersList, filteredUsersList } = this.state;

    const filteredUserIndex = filteredUsersList.findIndex(
      (eachItem) => eachItem.id === editedUser.id
    );
    filteredUsersList.splice(filteredUserIndex, 1, editedUser);

    const usersListIndex = usersList.findIndex(
      (eachItem) => eachItem.id === editedUser.id
    );
    usersList.splice(usersListIndex, 1, editedUser);

    this.setState(
      {
        usersList: usersList,
        filteredUsersList: filteredUsersList,
      },
      this.updateActivePageUsers
    );
  };

  render() {
    const { activePage, activePageUsers, allSelectCheckbox } = this.state;

    return (
      <div className="App">
        <div className="app-responsive-container">
          <input
            type="search"
            className="search-bar"
            placeholder="Search by name, email or role"
            onChange={this.onChangeSearchInput}
          />
          {activePageUsers.length > 0 ? (
            <>
              <ul className="users-list-container">
                <li className="list-header-container">
                  <input
                    type="checkbox"
                    id="allSelectCheckbox"
                    className="list-header-checkbox"
                    onChange={this.allCheckboxChanged}
                    checked={allSelectCheckbox}
                  />
                  <label
                    className="all-select-label"
                    htmlFor="allSelectCheckbox"
                  >
                    Select/Deselect
                  </label>
                  <h1 className="list-header-name">Name</h1>
                  <h1 className="list-header-email">Email</h1>
                  <h1 className="list-header-role">Role</h1>
                  <h1 className="list-header-actions">Actions</h1>
                </li>
                {activePageUsers.map((eachItem) => (
                  <UserListItem
                    eachItem={eachItem}
                    key={eachItem.id}
                    deleteUser={this.deleteUser}
                    editUser={this.editUser}
                    checkboxChanged={this.checkboxChanged}
                  />
                ))}
              </ul>
              <div className="navigation-delete-container">
                <div className="delete-select-button-container">
                  <button
                    type="button"
                    className="delete-select-button"
                    onClick={this.onDeleteSelected}
                  >
                    Delete Selected
                  </button>
                </div>
                <div className="navigation-container">
                  <button
                    type="button"
                    className="first-page-button"
                    onClick={this.onFirstPageClicked}
                  >
                    <FaAngleDoubleLeft className="first-page" />
                  </button>
                  <button
                    type="button"
                    className="previous-page-button"
                    onClick={this.onPreviousPageClicked}
                  >
                    <MdNavigateBefore className="previous-page" />
                  </button>
                  <span className="active-page">{activePage}</span>
                  <button
                    type="button"
                    className="next-page-button"
                    onClick={this.onNextPageClicked}
                  >
                    <MdNavigateNext className="next-page" />
                  </button>
                  <button
                    type="button"
                    className="last-page-button"
                    onClick={this.onLastPageClicked}
                  >
                    <FaAngleDoubleRight className="last-page" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="no-user-container">
              <h1 className="no-user-text">No users Found</h1>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
