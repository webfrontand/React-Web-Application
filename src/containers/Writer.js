import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { postRequest } from '../actions/post';


class Writer extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:'',
      article:''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  handleSubmit(e){
    e.preventDefault();
    let title = this.state.title;
    let article = this.state.article;
    let username = this.props.userinfo.username;

    return this.props.postRequest(title, article, username).then(
      () => {
        if(this.props.postRequestStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">작성 성공!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/list');
        } else {
          let $toastContent = $('<span style="color: #FFB4BA">필수 입력입니다!</span>');
          Materialize.toast($toastContent, 2000);
        }
      }
    )
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit} >
        <div className="marginTop">
          <ul className="collection">
            <li className="collection-item">
              <h1>글쓰기</h1>
            </li>
            <li className="collection-item">
              <div className="input-field col s12">
                <input
                  id="first-name"
                  type="text"
                  className="validate"
                  name="title"
                  onChange={this.handleChange}
                />
                <label htmlFor="first-name">제목</label>
              </div>
              <div className="input-field col s12">
                <textarea id="textarea1"
                  className="materialize-textarea"
                  name="article"
                  onChange={this.handleChange}
                  >
                </textarea>
                <label htmlFor="textarea1">본문</label>
              </div>
            </li>
            <li className="collection-item">
              <h1></h1>
            </li>
          </ul>
          <button
            className="btn submitBtn waves-effect waves-light pink accent-3"
            type="submit"
          >
            전송
          </button>
        </div>
      </form>
    )
  }
}


function mapStateToProps(state){
  return {
    userinfo: state.authenticate.check.userinfo,
    postRequestStatus: state.post.postrequest.status,
    postRequestError: state.post.postrequest.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Writer);
