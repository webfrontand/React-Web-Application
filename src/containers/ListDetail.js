import React, { Component } from 'react';
import { connect } from 'react-redux';
import { detailRequest, detailupdateRequest, detaildeleteRequest, commentListRequest, commentMoreRequest } from '../actions/post';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Recommend, Comment, CommentBox } from '../components';

class ListDetail extends Component {
  constructor(props){
    super(props);

    this.state = {
      title: '',
      article: '',
      isEdit: false
    }

    this.handleToggle = this.handleToggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleMore = this.handleMore.bind(this);
  }

  handleRemove(){
    this.props.detaildeleteRequest(this.props.params._id).then(
      () => {
        if(this.props.deleteStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">삭제 완료!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/list');
        } else {
          let errorMessage = [
            "올바르지 않은 접근입니다.",
            "존재하지 않는 게시글 입니다.",
            "올바르지 않은 접근입니다."
          ];

          let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.deleteError] + '</span>');
          Materialize.toast($toastContent, 2000);
        }
      }
    )
  }

  handleSubmit(e){
    e.preventDefault();
  }

  handleToggle(){
    this.setState({
      isEdit: !this.state.isEdit
    });

    if(this.state.isEdit){
      let title = this.state.title;
      let article = this.state.article;
      let id = this.props.params._id;
      this.props.detailupdateRequest(title, article, id).then(
        () => {
          if(this.props.updateStatus === "SUCCESS"){
            let $toastContent = $('<span style="color: #fff">수정 완료!</span>');
            Materialize.toast($toastContent, 2000);
          } else {
            let errorMessage = [
              "올바르지 않은 접근입니다.",
              "제목과 본문은 필수 입력입니다.",
              "존재하지 않는 게시글 입니다.",
              "올바르지 않은 접근입니다."
            ];

            let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.updateError] + '</span>');
            Materialize.toast($toastContent, 2000);
          }
        }
      )
    }
  }
  handleChange(e){
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  handleMore(){
    let lastId = this.props.comments[this.props.comments.length-1]._id;
    return this.props.commentMoreRequest(this.props.params._id, lastId)
  }
  componentDidMount(){
    this.props.detailRequest(this.props.params._id);
    this.props.commentListRequest(this.props.params._id);
  }

  componentWillReceiveProps(nextProps){
    let data = JSON.parse(JSON.stringify(nextProps))
    const { title, article } = data.result;
    this.setState({
      title,
      article
    })
  }
  render(){
    const { _id } = this.props.userinfo;
    const { writer } = this.props.result;


    const controller = (
      <ul className="collection">
        <li className="collection-item">
        <button
          className="btn waves-effect marginRight waves-light pink accent-3"
          onClick={this.handleToggle}
        >
          수정
        </button>
        <button
          className="btn waves-effect waves-light pink accent-3"
          onClick={this.handleRemove}
        >
          삭제
        </button>
        </li>
      </ul>
    )

    const edit = (
      <form onSubmit={this.handleSubmit} >
        <div className="marginTop">
          <ul className="collection">
            <li className="collection-item">
              <h1>수정</h1>
            </li>
            <li className="collection-item">
              <div className="input-field col s12">
                <input
                  id="first-name"
                  type="text"
                  className="validate"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title}
                />
                <label htmlFor="first-name"></label>
              </div>
              <div className="input-field col s12">
                <textarea id="textarea1"
                  className="materialize-textarea"
                  name="article"
                  onChange={this.handleChange}
                  value={this.state.article}
                  >
                </textarea>
                <label htmlFor="textarea1"></label>
              </div>
            </li>
            <li className="collection-item">
              <h1></h1>
            </li>
          </ul>
          <div>
            { _id == writer ? controller : undefined }
          </div>
        </div>
      </form>
    )

    const basic = (
      <form onSubmit={this.handleSubmit}>
        <div className="marginTop">
          <ul className="collection">
            <li className="collection-item">
              <h1>{this.props.result.title}</h1>
              <span>[{this.props.result.username}]</span>
            </li>
            <li className="collection-item">
              <div className="input-field col s12">
                <p>
                  {this.props.result.article}
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <Recommend />
          { _id == writer ? controller : undefined }
        </div>
      </form>
    )

    const mapTo = (data) => {
      return data.map((result, i) => {
        return (
          <Comment
            index={i}
            check={ this.props.userinfo._id }
            key={i}
            comments={result}
          />
        )
      })
    }
    return (
      <div>
      { this.state.isEdit ? edit : basic }
      <CommentBox/>
      { mapTo(this.props.comments)}
      <p>{ this.props.share.indexOf(this.props.userinfo._id) > -1 ? controller : undefined }</p>
      <button
        className="btn submitBtn waves-effect waves-light pink accent-3"
        onClick={this.handleMore}
        disabled={this.props.commentLast ? true : false}
      >
        {this.props.commentLast ? '끝' : '더보기' }
      </button>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    result: state.post.detail.result,
    share: state.post.detail.result.shareUser,
    userinfo: state.authenticate.check.userinfo,
    updateStatus: state.post.update.status,
    updateError: state.post.update.error,
    deleteStatus: state.post.delete.status,
    deleteError: state.post.delete.error,
    comments: state.post.comment.list,
    commentmoreStatus: state.post.commentmore.status,
    commentmoreError: state.post.commentmore.error,
    commentLast: state.post.commentmore.last
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    detailRequest,
    detailupdateRequest,
    detaildeleteRequest,
    commentListRequest,
    commentMoreRequest
  }, dispatch)
}

ListDetail.defaultProps = {
  share: []
}

export default connect(mapStateToProps, mapDispatchToProps)(ListDetail);
