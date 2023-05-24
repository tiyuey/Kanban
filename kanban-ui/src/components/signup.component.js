import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: ""
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
    });
  };

  handleSignUp = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    UserDataService.signup(username, password)
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "User created successfully!"
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: "Failed to create user!"
        });
      });
  };

  render() {
    const { username, password, message } = this.state;

    return (
      <div className="col-md-6">
        <form onSubmit={this.handleSignUp}>
          <h3>Sign Up</h3>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={this.onChangePassword}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">Sign Up</button>

          {message && <div className="alert alert-info mt-3">{message}</div>}
        </form>
      </div>
    );
  }
}
