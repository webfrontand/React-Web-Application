import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listRequest } from '../actions/post';
import { Link } from 'react-router';

class List extends Component {
  componentDidMount(){
    this.props.listRequest();
  }
  render(){
    const mapTo = (data) => {
      return data.map((data, i) => {
        return (
          <li className="collection-item" key={data._id}>
            <Link to={`/list/${data._id}`} className="listtext">
              {data.title}
            </Link>
          </li>
        )
      })
    }

    const empty = (
      <li className="collection-item">
        아무 글도 존재하지 않아요!
      </li>
    )
    return (
      <div className="marginTop">
          <ul className="collection">
            <li className="collection-item quote">글 목록</li>
            { this.props.lists.length == 0 ? empty : mapTo(this.props.lists)}

          </ul>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    lists: state.post.data.list
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    listRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
