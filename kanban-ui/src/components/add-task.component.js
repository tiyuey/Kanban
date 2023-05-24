import React, { Component } from "react";
import TaskDataService from "../services/task.service";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      type: "",
      brand: "",
      user: "",
      points: 1,
      due: new Date(), // Bugünün tarihi olarak ayarlanır
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }

  onChangeBrand(e) {
    this.setState({
      brand: e.target.value
    });
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      due: date
    });
  }

  saveTask() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      type: this.state.type,
      brand: this.state.brand,
      user: this.state.user,
      due: this.state.due
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          type: response.data.type,
          brand: response.data.brand,
          user: response.data.user,
          due: response.data.due,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      title: "",
      description: "",
      type: "to do",
      brand: "Hexaworks",
      user: "",
      due: new Date(), // Bugünün tarihi olarak ayarlanır

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>Task added successfully!</h4>
            <Link className="btn btn-dark" to={"/"}>
              Back
            </Link>
            <button className="btn btn-primary" onClick={this.newTask}>
              Add Another
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Assign to</label>
              <input
                type="text"
                className="form-control"
                id="user"
                required
                value={this.state.user}
                onChange={this.onChangeUser}
                name="user"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Type</label>
              <select
                type="text"
                className="form-control"
                id="type"
                required
                value={this.state.type}
                onChange={this.onChangeType}
                name="type"
              >
                <option value="to do">To Do</option>
                <option value="in progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Brand</label>
              <select
                type="text"
                className="form-control"
                id="brand"
                required
                value={this.state.brand}
                onChange={this.onChangeBrand}
                name="brand"
              >
                <option value="Hexaworks">Hexaworks</option>
                <option value="Babil">Babil</option>
                <option value="Babil Kitap">Babil Kitap</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="due">Due Date</label>
              <DatePicker
                className="form-control"
                id="due"
                selected={this.state.due}
                onChange={this.onChangeDate}
                dateFormat="dd-MM-yyyy"
                name="due"
                placeholderText="Select Due Date"
              />
            </div>

            <Link className="btn btn-dark" to={"/"}>
              Back
            </Link>

            <button onClick={this.saveTask} className="btn btn-primary">
              Add
            </button>
          </div>
        )}
      </div>
    );
  }
}
