import React from 'react';
import ReactDOM from 'react-dom';

const ShowPage = ({user}) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                    <img className="card-img-top" src={user.avatar} alt="Card image cap"/>
                    <div className="card-body">
                       <div>{user.description || "You haven't published any description!"}</div> 
                       <hr/>
                       <div>{user.created_at}</div> 
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="card">
                        <div className="card-body"> <h3 className="d-inline mr-3">{user.name}</h3> {user.email}</div>
                    </div>
                    <hr/>
                    <div className="card mt-3">
                        <div className="card-body">
                            No data ~_~ 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowPage;

const showPageDom = document.getElementById('users-show-page');
if (showPageDom) {
    ReactDOM.render(<ShowPage user={JSON.parse(showPageDom.dataset.user)}/>, showPageDom);
}
