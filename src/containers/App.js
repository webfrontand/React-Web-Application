import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Nav, Wall } from '../components';
import { checkRequest } from '../actions/check';
import { logoutRequest } from '../actions/authenticate';

class App extends React.Component {
    componentDidMount(){
      this.props.checkRequest();
    }
    render(){
        const re = /(login|register)/;
        const wall = /(mypage|out|thumbnail)/;

        const path = re.test(this.props.location.pathname);
        const wallpath = wall.test(this.props.location.pathname);

        return (
          <div>
            { path ? undefined : <Nav valid={this.props.valid} logoutRequest={this.props.logoutRequest} userinfo={this.props.userinfo}/> }
            { wallpath ? <Wall /> : undefined }
            <div className="container">
              {this.props.children}
            </div>
          </div>
        );
    }
}
function mapStateToProps(state){
  return {
    valid: state.authenticate.check.valid,
    userinfo: state.authenticate.check.userinfo
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    checkRequest, logoutRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
