import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment'
import Pagination from '../util/Pagination'

const ShowPage = ({ user }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <img
              className="card-img-top"
              src={user.avatar}
              alt="Card image cap"
            />
            <div className="card-body">
              <div>
                {user.description || "You haven't published any description!"}
              </div>
              <hr />
              <div>
                <Moment fromNow>{user.created_at}</Moment>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h3 className="d-inline mr-3">{user.name}</h3> {user.email}
            </div>
          </div>
          <hr />
          <div className="card mt-3">
            <div className="card-body">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href={`/posts?userId=${user.id}`}
                  >
                    {user.name}'s posts
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    {user.name}'s replies
                  </a>
                </li>
              </ul>
              <ul className="list-unstyled">
                {user.posts.data.map(post => (
                  <li key={post.id} className=" mt-3 ">
                    {post.title}
                    <span className="float-right">
                      <Moment fromNow>{user.created_at}</Moment>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="pagination justify-content-center">
                <Pagination paginator={user.posts} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowPage

const showPageDom = document.getElementById('users-show-page')
if (showPageDom) {
  ReactDOM.render(
    <ShowPage user={JSON.parse(showPageDom.dataset.user)} />,
    showPageDom
  )
}
