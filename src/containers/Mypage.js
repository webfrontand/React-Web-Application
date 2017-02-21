import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { userUpdateRequest } from '../actions/user';

class Mypage extends Component {
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
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){
    if(!this.props.valid){
      let $toastContent = $('<span style="color: #FFB4BA">로그인하세요!</span>');
      Materialize.toast($toastContent, 2000);
      browserHistory.push('/');
    }
  }

  componentWillMount(){
    this.setState({
      email: this.props.userinfo.email
    });
  }

  handleSubmit(e){
    e.preventDefault();
  }

  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleUpdate(){
    let username = this.state.username;
    let password = this.state.password;
    let confirmpassword = this.state.confirmpassword;

    if(password != confirmpassword){
      let $toastContent = $('<span style="color: #FFB4BA">비밀번호가 일치하지 않아요!</span>');
      Materialize.toast($toastContent, 2000);
      this.setState({
        password:'',
        confirmpassword:''
      })
    } else {
      return this.props.userUpdateRequest(username, password).then(
        () => {
          if(this.props.userupdateStatus === "SUCCESS"){
            let $toastContent = $('<span style="color: #fff">수정 완료!</span>');
            Materialize.toast($toastContent, 2000);
            browserHistory.push('/');
          } else {
            let errorMessage = [
              "이름과 비밀번호는 필수입력입니다.",
              "이미 존재하는 이름입니다.",
            ];

            let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.userupdateError] + '</span>');
            Materialize.toast($toastContent, 2000);
          }
        }
      )
    }
  }
  render(){
    const { email, username, password, thumbnail } = this.props.userinfo;

    const infoupdate = (
      <ul className="collection">
        <li className="collection-item">
          <div>계정</div>
          <span>계정 정보를 수정하세요</span>
        </li>
        <li className="collection-item">

        <div className="row center">
          <img
            className="circle"

            src={ thumbnail == undefined ? "thumbnail/none.jpg" : "thumbnail/"+thumbnail+".jpg"}
          />
        </div>
        <div className="row">

          <form className="col s12" onSubmit={this.handleSubmit}>

            <div className="row">
              <div className="input-field col s12">

                <input
                  id="first-name"
                  type="text"
                  className="validate"
                  name="email"
                  disabled
                  value={this.state.email}
                />
                <label htmlFor="first-name"></label>
              </div>
            </div>

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

            <button
              className="btn submitBtn waves-effect waves-light pink accent-3"

              onClick={this.handleUpdate}
            >
              수정하기
            </button>
          </form>
        </div>
        </li>
      </ul>
    )
    return (
      <div className="row">
        <div className="col s12 m12 l3">
          <ul className="collection">
            <li className="collection-item quote">계정</li>
            <li className="collection-item">
              <Link
                className="redcolor"
                to="/out">
              탈퇴</Link>
            </li>
            <li className="collection-item">
              <Link
                className="textblack"
                to="/thumbnail">
                이미지
              </Link>
            </li>
            <li className="collection-item">
              <Link
                className="textblack"
                to="/message">
                메시지
              </Link>
            </li>
          </ul>
        </div>
        <div className="col s12 m12 l9">
          { infoupdate }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    userinfo: state.authenticate.check.userinfo,
    valid: state.authenticate.check.valid,
    userupdateStatus: state.authenticate.userupdate.status,
    userupdateError: state.authenticate.userupdate.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    userUpdateRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Mypage);
