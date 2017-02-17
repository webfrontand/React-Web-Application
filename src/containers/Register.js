import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Authenticate } from '../components';
import { registerRequest } from '../actions/authenticate';
import { browserHistory } from 'react-router';

class Register extends Component {
  constructor(props){
    super(props);

    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(email, password, username){
    return this.props.registerRequest(email, password, username).then(
      () => {
        if(this.props.registerStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">회원가입 성공!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/');
          setTimeout(()=> {location.reload(false);}, 1000);
          return true;
        } else {
          let errorMessage = [
            "이메일, 패스워드, 비밀번호는 필수입력입니다.",
            "잘못된 이메일 형식입니다.",
            "잘못된 비밀번호 형식입니다",
            "존재하는 이메일입니다",
            "존재하는 이름입니다"
          ];
          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.registerError] + '</span>');
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
          task="회원가입"
          onRegister={this.handleRegister}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    registerStatus: state.authenticate.register.status,
    registerError: state.authenticate.register.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    registerRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
