import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

class Nav extends Component {
  constructor(props){
    super(props);
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout(){
    let $toastContent = $('<span style="color: #fff">로그아웃 성공!</span>');
    Materialize.toast($toastContent, 2000);
    this.props.logoutRequest();
    browserHistory.push('/');
  }
  render(){
    const userinfo = (
      <li><Link to="/mypage"><i className="material-icons">assignment_ind</i></Link></li>
    )

    const userinfoMobile = (
      <li><Link to="/mypage">내 정보</Link></li>
    )

    const login = (
      <li><Link to="/login"><i className="material-icons">lock_open</i></Link></li>
    )

    const logout = (
      <li><Link onClick={this.handleLogout}><i className="material-icons">lock</i></Link></li>
    )

    const modileLogout = (
      <li><Link onClick={this.handleLogout}>로그아웃</Link></li>
    )

    const writer = (
      <li><Link to="/writer"><i className="material-icons">mode_edit</i></Link></li>
    )
    const modileWriter = (
      <li><Link to="/writer">작성</Link></li>
    )

    const { username, thumbnail } = this.props.userinfo;
    const { valid } = this.props;

    return (
      <nav>
        <div className="nav-wrapper grey darken-4">
          <Link to="/" className="brand-logo">모음</Link>

          <Link data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>

          <ul className="right hide-on-med-and-down">
            { valid ? undefined : login }
            { valid ? writer : undefined }
            <li><Link to="list"><i className="material-icons">dashboard</i></Link></li>
            { valid ? logout : undefined }
            { valid ? userinfo : undefined }
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li><div className="userView">
              <div className="background"></div>
              <img
                className="circle"
                src={ thumbnail == undefined ? "/thumbnail/none.jpg" : "/thumbnail/"+thumbnail+".jpg"}
              />
              <Link><span className="white-text name">{username}</span></Link>
              <Link to="/login"><span className="white-text email">{ valid ? undefined : "로그인하세요!"}</span></Link>
            </div>
            </li>
            <li><Link to="/">홈</Link></li>
            { valid ? userinfoMobile : undefined }
            { valid ? modileWriter : undefined}
            <li><Link to="list">글 목록</Link></li>
            { valid == true ? modileLogout : undefined }
          </ul>


        </div>
      </nav>
    )
  }
}

export default Nav;
