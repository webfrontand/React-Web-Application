import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messageRequest } from '../actions/post';

class Message extends Component {
  constructor(props){
    super(props);
  }
  componentWillMount(){
    this.props.messageRequest(this.props.id);
  }
  render(){
    const mapTo = (data) => {
      return data.map((result, i) => {
        return (
          <div key={result._id}>
            {result.from}님께서 회원님({result.to})에게 {result.alert}를 신청하셨습니다.
            <button>수락하기</button>
            <button>거절하기</button>
          </div>
        )
      })
    }
    return (
      <div>
        <ul className="collection">
          <li className="collection-item">
            <h1>받은 메시지</h1>
          </li>
          <li className="collection-item">
            { this.props.result.length == 0 ? '아무 메시지도 없어요!' : mapTo(this.props.result)}
          </li>
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    id: state.authenticate.check.userinfo._id,
    result: state.post.message.list
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    messageRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Message);
