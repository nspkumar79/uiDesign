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
    selectedUsers: [],
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const apiUrl =
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
    const response = await fetch(apiUrl);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      this.setState({ usersList: fetchedData, filteredUsersList: fetchedData });
    }
  };

  onFirstPageClicked = () => {
    this.setState({ activePage: 1 });
  };

  onPreviousPageClicked = () => {
    const { activePage } = this.state;
    if (activePage > 1) {
      this.setState((prev) => ({ activePage: prev.activePage - 1 }));
    }
  };

  onNextPageClicked = () => {
    const { activePage, filteredUsersList } = this.state;
    const usersListCount = filteredUsersList.length;
    const upperPaginationNumber = Math.ceil(usersListCount / 10);
    if (activePage < upperPaginationNumber) {
      this.setState((prev) => ({ activePage: prev.activePage + 1 }));
    }
  };

  onLastPageClicked = () => {
    const { filteredUsersList } = this.state;
    const usersListCount = filteredUsersList.length;
    const upperPaginationNumber = Math.ceil(usersListCount / 10);
    this.setState({ activePage: upperPaginationNumber });
  };

  renderRequiredUserList = () => {
    const { activePage, filteredUsersList } = this.state;
    const lowerIndex = (activePage - 1) * 10;
    const upperIndex = activePage * 10;

    const updatedFilteredUserList = filteredUsersList.slice(
      lowerIndex,
      upperIndex
    );

    return updatedFilteredUserList;
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
    this.setState({ filteredUsersList: filteredUsersList, activePage: 1 });
  };

  allCheckboxChanged = () => {};

  checkboxChanged = (id) => {
    const { selectedUsers } = this.state;
    if (selectedUsers.includes(id)) {
      const updatedSelectedUsers = selectedUsers.filter((item) => item !== id);
      this.setState({ selectedUsers: updatedSelectedUsers });
    } else {
      selectedUsers.push(id);
      this.setState({ selectedUsers: selectedUsers });
    }
  };

  deleteUser = (id) => {
    const { filteredUsersList } = this.state;
    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => user.id !== id
    );
    this.setState({ filteredUsersList: updatedFilteredUsersList });
  };

  onDeleteSelected = () => {
    const { selectedUsers, filteredUsersList } = this.state;
    console.log(selectedUsers);
    const updatedFilteredUsersList = filteredUsersList.filter(
      (user) => !selectedUsers.includes(user.id)
    );
    this.setState({ filteredUsersList: updatedFilteredUsersList });
  };

  editUser = (id) => {};

  render() {
    const { activePage } = this.state;
    const requiredUserList = this.renderRequiredUserList();
    return (
      <div className="App">
        <div className="app-responsive-container">
          <input
            type="search"
            className="search-bar"
            placeholder="Search by name, email or role"
            onChange={this.onChangeSearchInput}
          />
          <ul className="users-list-container">
            <li className="list-header-container">
              <input
                type="checkbox"
                className="list-header-checkbox"
                onChange={this.allCheckboxChanged}
              />
              <h1 className="list-header-name">Name</h1>
              <h1 className="list-header-email">Email</h1>
              <h1 className="list-header-role">Role</h1>
              <h1 className="list-header-actions">Actions</h1>
            </li>
            <hr className="h-line" />
            {requiredUserList.map((eachItem) => (
              <UserListItem
                eachItem={eachItem}
                key={eachItem.id}
                deleteUser={this.deleteUser}
                editUser={this.editUser}
                checkboxChanged={this.checkboxChanged}
              />
            ))}
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
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
