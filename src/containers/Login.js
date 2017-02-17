import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Authenticate } from '../components';
import { loginRequest } from '../actions/authenticate';
import { browserHistory } from 'react-router';

class Login extends Component{
  constructor(props){
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin(email, password){
    return this.props.loginRequest(email, password).then(
      () => {
        if(this.props.loginStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">로그인 성공!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/');
          setTimeout(()=> {location.reload(false);}, 500);
          return true;
        } else {
          let errorMessage = [
            "잘못된 이메일 형식입니다.",
            "이메일과 비밀번호는 필수입력입니다.",
            "등록되지 않는 이메일입니다.",
            "비밀번호가 잘못 되었습니다."
          ];

          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.loginError] + '</span>');
          Materialize.toast($toastContent, 2000);
          return false;
        }
      }
    )
  }
  render(){
    return (
      <div>
        <Authenticate
          task="로그인"
          onLogin={this.handleLogin}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    loginStatus: state.authenticate.login.status,
    loginError: state.authenticate.login.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    loginRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
