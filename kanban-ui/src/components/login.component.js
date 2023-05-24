import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class Login extends Component {
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

  handleLogin = (e) => {
    e.preventDefault();

    const { username, password } = this.state;

    UserDataService.login(username, password)
      .then(response => {
        console.log(response.data);
        this.props.handleLogin();
        this.props.history.push("/tasks");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          message: "Invalid username or password"
        });
      });
  };

  render() {
    const { username, password, message } = this.state;

    return (
      <div className="col-md-6">
        <form onSubmit={this.handleLogin}>
          <h3>Login</h3>

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

          <button type="submit" className="btn btn-primary">Login</button>

          {message && <div className="alert alert-danger mt-3">{message}</div>}
        </form>
      </div>
    );
  }
}
