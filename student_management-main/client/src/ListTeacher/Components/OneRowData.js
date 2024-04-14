/* eslint-disable no-restricted-globals */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment";

class OneRowData extends Component {
  onDelete = (_id, username) => {
    if (confirm("Bạn chắc chắn muốn xóa sinh viên này ?")) {
      this.props.onDelete(_id, username);
    }
  };

  render() {
    var { student, index } = this.props;
    //console.log(student.ngaysinh);
    return (
      <tr height='30px'>
        <td className='text_center'>{index + 1}</td>
        <td className='text_center'>{student.username}</td>
        <td>{student.name}</td>
        <td>{student.lop}</td>

        <td className='text_center'>
          <Link
            to={`/home/list-teachers/update/${student._id}`}
            className='btn btn-warning'>
            <span className='fa fa-info'></span> &nbsp;Chi tiết
          </Link>{" "}
          &nbsp;
          <button
            className='btn btn-danger'
            type='button'
            onClick={() => this.onDelete(student._id, student.username)}>
            <span className='fa fa-trash'></span> &nbsp;Xóa
          </button>{" "}
          &nbsp;
        </td>
      </tr>
    );
  }
}

export default OneRowData;
