import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { messageRequest, permissionRequest, rejectRequest } from '../actions/post';

class Message extends Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this)
    this.handleRemove = this.handleRemove.bind(this);
  }
  handleClick(i){
    this.props.permissionRequest(this.props.result[i].what, i, this.props.result[i]._id, this.props.result[i].from);
  }

  handleRemove(i){
    this.props.rejectRequest(this.props.result[i]._id, i)
  }
  componentDidMount(){
    this.props.messageRequest(this.props.id);
  }

  render(){
    const mapTo = (data) => {
      return data.map((result, i) => {
        return (
          <div key={result._id}>
            {result.from}님께서 회원님({result.to})에게 {result.alert}를 신청하셨습니다.
            <button onClick={ () => { this.handleClick(i) }}>수락하기</button>
            <button onClick={ () => { this.handleRemove(i) }}>거절하기</button>
          </div>
        )
      })
    }


    return (
      <div className="row">
        <div className="col s12 m12 l6">
          <ul className="collection">
            <li className="collection-item">
              <h1>받은 메시지</h1>
            </li>
            <li className="collection-item">
              { this.props.result.length == 0 ? '아무 메시지도 없어요!' : mapTo(this.props.result)}
            </li>
          </ul>
        </div>

        <div className="col s12 m12 l6">
          <ul className="collection">
            <li className="collection-item">
              <h1>보낸 메시지</h1>
            </li>
            <li className="collection-item">
              아직 구현 x
            </li>
          </ul>
        </div>

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
    messageRequest,
    permissionRequest,
    rejectRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Message);
