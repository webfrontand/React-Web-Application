import React from 'react';

class Home extends React.Component {
    render(){
        return (
          <div className="row marginTop">
            <div className="col s12 m4">
              <div className="center card">
                <i className="material-icons iconSize">mode_edit</i>
                <p className="caption">
                  정리하는 즐거움
                </p>
                <p className="captionbody">
                  공부하면서 정리한 내용을 기록하고 공유하세요. 또, 다른 사람들의 지식
                  을 통해 성장하세요.
                </p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="center card">
                <i className="material-icons iconSize">flash_on</i>
                <p className="caption">
                  번쩍이는 아이디어
                </p>
                <p className="captionbody">
                  번쩍이는 아이디어를 많은 사용자와 공유하면서 발전시키세요!
                </p>
              </div>
            </div>
            <div className="col s12 m4">
              <div className="center card">
                <i className="material-icons iconSize">group</i>
                <p className="caption">
                  함께하는 소통
                </p>
                <p className="captionbody">
                  공통의 목표를 가진 사람들과 소통하세요!
                </p>
              </div>
            </div>

            <div className="marginTop">
              <div className="col s12 m12 l12">
                <div className="card center">
                  여기에는 머적냐 ;;
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default Home;
