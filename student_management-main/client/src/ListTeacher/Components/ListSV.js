/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import Sort from "./Sort";
import OneRowData from "./OneRowData";
import CallApi from "./../../API/CallApi";

class ListSV extends Component {
  constructor(props) {
    super(props);
    this.state = {
      students: this.props.students,
      filter: {
        username : "",
        lop: "",
        name:"",
      },
      sort: {
        by: "username",
        value: 1,
      },
    };
  }

  componentDidMount() {
    this.setState({
      students: this.props.students,
    });
  }

  onDelete = (_id, username) => {
    this.props.onDelete(_id, username);
  };

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      filter: {
        [name]: value,
      },
    });
  };

  onSort = (sortBy, sortValue) => {
    this.setState({
      sort: {
        by: sortBy,
        value: sortValue,
      },
    });
  };

  render() {
    var { filter, sort } = this.state;
    var students = this.props.students;
    console.log(students);
    if (filter) {
      if (filter.username) {
        students = students.filter((student) => {
          return student.username.indexOf(filter.username) !== -1;
        });
      }
      if (filter.name) {
        students = students.filter((student) => {
          return student.name.indexOf(filter.name) !== -1;
        });
      }
      if (filter.lop) {
        students = students.filter((student) => {
          return student.lop.indexOf(filter.lop) !== -1;
        });
      }
    }

    if (sort) {
      if (sort.by === "username") {
        students.sort((student1, student2) => {
          //console.log(typeof student1.name,'-',student2.name);
          if (student1.username > student2.username) return sort.value;
          else if (student1.username < student2.username) return -sort.value;
          else return 0;
        });
      } else if (sort.by === "name") {
        students.sort((student1, student2) => {
          if (student1.name.localeCompare(student2.name) < 0) return sort.value;
          else if (student1.name.localeCompare(student2.name) > 0)
            return -sort.value;
          else return 0;
        });
      } else {
        students.sort((student1, student2) => {
          if (student1.lop.localeCompare(student2.lop) < 0) return sort.value;
          else if (student1.lop.localeCompare(student2.lop) > 0)
            return -sort.value;
          else return 0;
        });
      }
    }
    var studentList = students.map((student, index) => {
      return (
        <OneRowData
          key={student.id}
          index={index}
          student={student}
          onDelete={this.onDelete}
        />
      );
    });
    return (
      <div>
        <table className="table table-bordered table-hover">
          <Sort onSort={this.onSort} />

          <tbody>
            <tr>
              <td></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  value={filter.username}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={filter.name}
                  onChange={this.onChange}
                />
              </td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  name="lop"
                  value={filter.lop}
                  onChange={this.onChange}
                />
              </td>
              <td></td>
            </tr>
            {studentList}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ListSV;
