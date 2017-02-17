import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { outRequest, logoutRequest } from '../actions/authenticate';

class Out extends Component {
  constructor(props){
    super(props);

    this.handleOut = this.handleOut.bind(this);
  }

  componentDidMount(){
    if(!this.props.valid){
      browserHistory.push('/')
    }
  }
  handleOut(){
    return this.props.outRequest().then(
      () => {
        if(this.props.outStatus === "SUCCESS"){
          let $toastContent = $('<span style="color: #fff">탈퇴 성공!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/');
          this.props.logoutRequest();
          setTimeout(()=> {location.reload(false);}, 500);
        }
      }
    )
  }
  render(){
    return (
      <div className="row">
        <div className="col s12 m12 l12">
          <ul className="collection">
            <li className="collection-item">
              <h1 className="center">정말 탈퇴하시겠습니까?</h1>
            </li>
            <li className="collection-item">
              <button
                className="btn submitBtn waves-effect waves-light pink accent-3"
                onClick={this.handleOut}
              >
                탈퇴하기
              </button>
            </li>
            <li className="collection-item">
              <button
                className="btn submitBtn waves-effect waves-light blue darken-2"
              >
                <Link to="/">
                  돌아가기
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    outStatus: state.authenticate.out.status,
    valid: state.authenticate.check.valid
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    outRequest,
    logoutRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Out);
