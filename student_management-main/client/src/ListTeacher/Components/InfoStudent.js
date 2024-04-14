/* eslint-disable react/jsx-pascal-case */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import CallApi from "../../API/CallApi";
import styled from "styled-components";
import moment from "moment";
import "../../index.css";
import bg_link from "./avatar.png";

const Title = styled.h2`
  text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3);
  font-size: 5rem;
  font-weight: bolder;
  margin-top: 5%;
  color: #0b5592;
`;
const Infor_site = styled.div`
  background-color: white;
  padding: 2rem 3rem;
  width: 60%;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2),
    8px 8px 8px 8px rgba(0, 0, 0, 0.19);
  border-radius: 10px;
  background-color: whitesmoke;
`;
const Infor = styled.div`
  display: flex;
`;
const Left_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 35%;
`;
const Right_div = styled.div`
  padding-right: 10px;
  padding-left: 10px;
  max-width: 35%;
  margin-left: 2rem;
`;
const Image_div = styled.div`
  padding-top: 30px;
`;
const Title_infor = styled.p`
  font-size: 2.5rem;
  width: 60%;
  margin: auto;
  padding-bottom: 20px;
  text-align: center;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  // text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
  //   0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Title_gpa = styled.p`
  font-size: 2.5rem;
  // width: 50%;
  // margin: auto;
  padding-bottom: 20px;
  font-weight: bold;
  //text-align: center;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  // text-shadow: 2px 7px 5px rgba(0, 0, 0, 0.3),
  //   0px -4px 10px rgba(255, 255, 255, 0.3);
`;
const Gpa_site = styled.div`
  // border: 1px solid black;
  background-color: whitesmoke;
  border-radius: 10px;
  width: 40%;
  padding: 2rem 3rem;
  margin-left: 5%;
  height: 50vh;
  align-items: center;
  box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.2),
    8px 8px 8px 8px rgba(0, 0, 0, 0.19);
  text-align: center;
`;
const Site = styled.div`
  display: flex;
  margin-top: 10%;
`;
const Btn_site = styled.div`
  position: static;
  margin-top: 5vh;
  text-align: center;
`;

const Container = styled.div``;
class InfoStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: [],
      name: "",
      lop: "",
      username: "",
    };
  }

  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;
      CallApi(`teacher/${id}`, "GET", null).then((res) => {
        var data = res.data.StudentDetail[0];
        console.log(data);
        this.setState({
          student: data,
          name: data.name,
          lop: data.lop,
          username: data.username,
        });
      });
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    var id = this.props.match.params.id;
    CallApi(`teacher/update/${id}`, "PATCH", {
      name: this.state.name,
      lop: this.state.lop,
    }).then((res) => {
      alert("Cập nhật thành công");
    });
  };

  render() {
    var { student } = this.state;

    return (
      <Container className='container'>
        <Title>Thông tin chi tiết</Title>
        <Site>
          <Infor_site>
            <Title_infor>Thông tin cá nhân</Title_infor>
            <Infor>
              <Image_div>
                <img
                  className='avatar'
                  src={bg_link}
                  width='150px'
                  height='150px'
                />
              </Image_div>
              <Left_div>
                <p>Tài khoản: </p>
                <label>{student.username}</label>
                <p style={{ marginTop: "10px" }}>Họ và tên: </p>
                <input
                  type='text'
                  name='name'
                  placeholder={student.name}
                  onChange={this.onChange}
                  style={{ width: "150px" }}
                />
              </Left_div>
              <Right_div>
                
                <p style={{ marginTop: "10px" }}>Lớp: </p>
                <textarea
                  style={{
                    resize: "none",
                    width: "175px",
                    minHeight: "9rem",
                  }}
                  type='text'
                  name='lop'
                  placeholder={student.lop}
                  onChange={this.onChange}
                />
              </Right_div>
            </Infor>
          </Infor_site>

        </Site>
        <Btn_site>
          <Link
            to='/home/list-teachers'
            className='goback btn btn-danger'
            style={{ marginRight: "20px" }}>
            <span className='fa fa-arrow-left'></span> &nbsp; Quay lại
          </Link>
          <button
            type='submit'
            className='btn btn-primary'
            style={{ marginRight: "20px" }}
            onClick={this.onSubmit}>
            <span className='fa fa-save'></span> &nbsp; Ghi nhận
          </button>
        </Btn_site>
      </Container>
    );
  }
}
export default InfoStudent;
