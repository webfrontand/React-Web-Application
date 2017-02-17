import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { postRequest } from '../actions/post';

class Writer extends Component {
  constructor(props){
    super(props);
    this.state = {
      title:''
    }
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(){
      var $text = `
        <li class="collection-item">
          <div class="row">

            <div class="input-field col s12 m12 l4">
              <input
                id="first-name"
                type="text"
                class="validate"
                name="urltitle"
              />
              <label htmlFor="first-name">문서명</label>
            </div>

            <div class="input-field col s12 m12 l8">
              <input
                id="first-name"
                type="text"
                class="validate"
                name="url"
              />
              <label htmlFor="first-name">URL</label>
            </div>
          </div>
        </li>
      `;

      $(".collection").append($text);
  }


  render(){
    return (
      <form method="post" action="/api/post" >
        <div className="marginTop">
          <ul className="collection">
            <li className="collection-item">
              <h1>제목</h1>
              <a
                className="btn submitBtn waves-effect waves-light pink accent-3"
                onClick={this.handleAdd}
              >
                추가
              </a>
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
    postRequestStatus: state.post.postrequest.status
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    postRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Writer);
