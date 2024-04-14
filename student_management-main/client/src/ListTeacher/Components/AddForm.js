import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import axios from "axios";
class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password:"",
      name: "",
      lop: "",
      lopteacher : [],
      lopadd : [],
    };  
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    this.setState({
      lopteacher: sessionStorage.getItem("lop").split(", "),
    });
  }

  handleChange = (event) => {

  };

  onSubmit = (event) => {
    event.preventDefault();
    CallApi("create-teacher-account", "POST", {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name,
      lop: this.state.lop,
    });

    const headers = {
      "PRIVATE-KEY": "b9d2bf98-9a53-48aa-9513-c202983820ca",
    };

    axios.post(
      "https://api.chatengine.io/users/",
      {
        username: this.state.username.toString(),
        secret: this.state.username.toString(),
      },
      {
        headers: headers,
      }
    );

    this.setState({
   
      username: "",
      password: "",
      name: "",
      lop: "",
    });
    alert("Đã thêm thành công");
  };

  render() {
    var { lopteacher } = this.state;


    return (
      <div className="addForm">
        <div className="back">
          <Link to="/home/list-teachers" className="btn btn-danger">
            <span className="fa fa-arrow-left"></span> &nbsp; Quay lại
          </Link>
        </div>
        <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 center">
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h3 className="panel-title">Thêm giáo viên</h3>
            </div>
            <div className="panel-body">
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Tài khoản: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  <label>Mật khẩu: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  <label>Họ và tên: </label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />

                  <label>Lớp:</label>
                  <input
                    placeholder="vd: K64-CA-CLC-4"
                    type="text"
                    className="form-control"
                    required
                    name="lop"
                    value={this.state.lop}
                    onChange={this.onChange}
                  />
                  <br />

                 {/* <div style={{height: 200,   overflow: "auto"}}>
                  {lopteacher.map((item) => (
                   <div >           <label>{item}-</label> 
                    <input type="checkbox" name={item} value={item} onChange={this.handleChange}/>
                     </div>   
                    ))}                  
</div> */}
                  <div className="text_center">
                    <button
                      type="submit"
                      className="button submit btn btn-primary"
                      onClick={this.onSubmit}
                    >
                      <span className="fa fa-plus"></span> &nbsp;Lưu lại
                    </button>{" "}
                    &nbsp;
                    <Link
                      to="/home/list-teachers"
                      className="button cancle btn btn-primary"
                    >
                      <span className="fa fa-close"></span> &nbsp;Hủy bỏ
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddForm;
