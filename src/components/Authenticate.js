import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

class Authenticate extends Component{
  constructor(props){
    super(props);

    this.state = {
      email:'',
      password:'',
      confirmpassword:'',
      username:''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount(){

    if(this.props.valid){
      let $toastContent = $('<span style="color: #FFB4BA">이미 로그인 상태입니다.</span>');
      Materialize.toast($toastContent, 2000);
      browserHistory.push('/');
    } 
  }
  handleSubmit(e){
    e.preventDefault();
  }
  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
    console.log(nextState);
  }

  handleLogin(){
    let email = this.state.email;
    let password = this.state.password;

    this.props.onLogin(email, password).then(
      (success) => {
        if(!success){
          this.setState({
            email:'',
            password:''
          })
        }
      }
    )
  }
  handleRegister(){
    let email = this.state.email;
    let password = this.state.password;
    let confirmpassword = this.state.confirmpassword;
    let username = this.state.username;

    if(confirmpassword != password){
      let $toastContent = $('<span style="color: #FFB4BA">비밀번호가 일치하지 않습니다.</span>');
      Materialize.toast($toastContent, 2000);
      this.setState({
        password:'',
        confirmpassword:''
      })
      return;
    }
    this.props.onRegister(email, password, username).then(
      (success) => {
        if(!success){
          this.setState({
            email:'',
            password:'',
            confirmpassword:'',
            username:''
          })
        }
      }
    )
  }
  render(){
    const loginBtn = (
      <button
        className="btn submitBtn waves-effect waves-light pink accent-3"
        type="submit"
        onClick={this.handleLogin}
      >
        들어가기
      </button>
    )

    const registerBtn = (
      <button
        className="btn submitBtn waves-effect waves-light pink accent-3"
        type="submit"
        onClick={this.handleRegister}
      >
        가입하기
      </button>
    )

    const confirm = (
      <div className="row">
        <div className="input-field col s12">
          <input
            id="first-name"
            type="password"
            className="validate"
            name="confirmpassword"
            value={this.state.confirmpassword}
            onChange={this.handleChange}
          />
          <label htmlFor="first-name">비밀번호 재확인</label>
        </div>
      </div>
    )
    const register = (
      <div className="row">
        <div className="input-field col s12">
          <input
            id="first-name"
            type="text"
            className="validate"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="first-name">이름</label>
        </div>
      </div>
    )

    const request = (
      <div className="row right">
        <div className="font">회원이 아니신가요?</div>
        <Link to="/register" className="pink-text">회원가입하세요</Link>
      </div>
    )

    const home = (
      <div className="row right">
        <Link to="/" className="font pink-text">돌아가기</Link>
      </div>
    )

    const login = (
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>

          <div className="row">
            <div className="input-field col s12">

              <input
                id="first-name"
                type="text"
                className="validate"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <label htmlFor="first-name">이메일</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input
                id="first-name"
                type="password"
                className="validate"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <label htmlFor="first-name">비밀번호</label>
            </div>
          </div>
          { this.props.task === "로그인" ? undefined : confirm }
          { this.props.task === "로그인" ? undefined : register }
          <div className="row">
            <div className="col s12">
              { this.props.task === "로그인" ? loginBtn : registerBtn }
            </div>
          </div>
          { this.props.task === "로그인" ? request : home }
        </form>
      </div>
    )

    return (
      <div className="row pos">
        <div className="col s12 col m8 push-m2  col l6 push-l3">
          <div className="card-panel white z-depth-5">
            <h3>{this.props.task}</h3>
            {login}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
    return {
      valid: state.authenticate.check.valid
    }
}

export default connect(mapStateToProps)(Authenticate);
