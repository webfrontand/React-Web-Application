import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { uploadRequest } from '../actions/upload';
import { logoutRequest} from '../actions/authenticate';

class Thumbnail extends Component {
  constructor(props){
    super(props);

    this.state = {
      img:''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
    if(!this.props.valid){
      browserHistory.push('/')
    }
  }
  handleSubmit(){
    let email = this.props.userinfo.email;
    let thumbnailName = this.state.img;
    let splitThumbnail = thumbnailName.split('.')[0]
    this.props.uploadRequest(email, splitThumbnail).then(
      () => {
        if(this.props.uploadStatus === "SUCCESS"){
          this.props.logoutRequest();
          let $toastContent = $('<span style="color: #fff">수정 완료 다시 로그인해주세요!</span>');
          Materialize.toast($toastContent, 2000);
          browserHistory.push('/login');
        }
      }
    );
  }

  handleChange(e){
    this.setState({
      img: e.target.files[0].name
    });
  }
  render(){
    return (
      <div className="row">
        <form action="/api/auth/upload" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div className="col s12 m12 l12">
            <ul className="collection">
              <li className="collection-item">
                <div className="file-field input-field">
                  <div className="btn blue darken-2">
                    <span>File</span>
                    <input
                      type="file"
                      name="myfile"
                      onChange={this.handleChange}
                      multiple />
                  </div>
                  <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" placeholder="Upload one or more files" />
                  </div>
                </div>

              </li>
              <li className="collection-item">
                <button
                  type="submit"
                  className="btn submitBtn waves-effect waves-light blue darken-2"
                >수정하기</button>
              </li>
            </ul>
          </div>
        </form>
      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    uploadStatus: state.authenticate.upload.status,
    uploadError: state.authenticate.upload.error,
    userinfo: state.authenticate.check.userinfo,
    valid: state.authenticate.check.valid
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    uploadRequest,
    logoutRequest
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Thumbnail);
