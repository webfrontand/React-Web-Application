import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { recommentRequest} from '../actions/post';

class Recommend extends Component {
  constructor(props){
    super(props);

    this.handleRecommend = this.handleRecommend.bind(this);


  }
  handleRecommend(){
    return this.props.recommentRequest(this.props.result._id)
  }
  render(){

    return (
      <ul className="collection">
        <li className="collection-item">
        <button
          className="btn waves-effect marginRight waves-light pink accent-3"
          onClick={this.handleRecommend}
        >
          추천
        </button>
        [{ this.props.starred.length }]개
        </li>
      </ul>
    )
  }
}

function mapStateToProps(state){
  return {
    recommendStatus: state.post.recommend.status,
    recommendError: state.post.recommend.error,
    result: state.post.detail.result,
    starred: state.post.detail.result.starred
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    recommentRequest
  }, dispatch)
}

Recommend.defaultProps = {
  starred: []
}
export default connect(mapStateToProps, mapDispatchToProps)(Recommend);
