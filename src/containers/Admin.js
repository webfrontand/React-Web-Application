import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { listAdminRequest } from '../actions/post';

class Admin extends Component {
  constructor(props){
    super(props);

  }
  componentWillMount(){
    this.props.listAdminRequest(this.props.writer)
  }
  render(){
    return (
      <div>
        { this.props.writer }
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    writer: state.authenticate.check.userinfo._id
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    listAdminRequest
  }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
