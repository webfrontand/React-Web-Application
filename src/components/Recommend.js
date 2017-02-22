import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recommentRequest, shareRequest } from '../actions/post';

class Recommend extends Component {
  constructor(props){
    super(props);

    this.handleRecommend = this.handleRecommend.bind(this);
    this.handleShare = this.handleShare.bind(this);

  }
  handleRecommend(){
    return this.props.recommentRequest(this.props.result._id);
  }
  handleShare(){
    return this.props.shareRequest(this.props.result._id)
  }
  render(){
    const share = (
      <li className="collection-item">
        <button
          className="btn waves-effect marginRight waves-light pink accent-3"
          onClick={this.handleShare}
        >
          {this.props.sharerequest.indexOf(this.props.userinfo._id) > -1 ? '기다려주세요' : '공유하기'}
        </button>
      </li>
    )
    return (
      <ul className="collection">
        <li className="collection-item">
        <button
          className="btn waves-effect marginRight waves-light pink accent-3"
          onClick={this.handleRecommend}
        >
          { this.props.starred.indexOf(this.props.userinfo._id) > -1 ? '취소': '추천' }
        </button>
        [{ this.props.starred.length }]개
        </li>
        {this.props.userinfo._id == this.props.result.writer ? undefined :  this.props.share.indexOf(this.props.userinfo._id) > -1 ? undefined : share}

      </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    recommendStatus: state.post.recommend.status,
    recommendError: state.post.recommend.error,
    sharerequest: state.post.detail.result.shareRequestUser,
    share: state.post.detail.result.shareUser,
    userinfo: state.authenticate.check.userinfo,
    result: state.post.detail.result,
    starred: state.post.detail.result.starred,
    shareStatus: state.post.share.status,
    shareError: state.post.share.error
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    recommentRequest,
    shareRequest
  }, dispatch)
}

Recommend.defaultProps = {
  starred: [],
  share: [],
  sharerequest: []
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
