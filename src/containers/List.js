import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listRequest, listaddRequest } from '../actions/post';
import { Link } from 'react-router';

class List extends Component {
  constructor(props){
    super(props);

    this.handleAdd = this.handleAdd.bind(this);
  }
  handleAdd(){
    let lastid = this.props.lists[this.props.lists.length-1]._id;

    this.props.listaddRequest(lastid);
  }
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
            <li className="collection-item quote"><h1>글 목록</h1></li>
            { this.props.lists.length == 0 ? empty : mapTo(this.props.lists)}

            <button
              className="btn submitBtn waves-effect waves-light pink accent-3"
              onClick={this.handleAdd}
              disabled={this.props.listaddLast ? true : false}
            >
              { this.props.listaddLast ? '끝' : '더보기' }
            </button>
          </ul>
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    lists: state.post.data.list,
    listaddStatus: state.post.listadd.status,
    listaddError: state.post.listadd.error,
    listaddLast: state.post.listadd.last
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    listRequest,
    listaddRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(List);
