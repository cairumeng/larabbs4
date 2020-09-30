import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment'

const ShowPage = ({ post }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <img
              className="card-img-top"
              src={post.user.avatar}
              alt="Card image cap"
            />
            <div className="card-body">
              <div>
                {post.user.description ||
                  "You haven't published any description!"}
              </div>
              <hr />
              <div>
                <Moment fromNow>{post.user.created_at}</Moment>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-body">
              <h3 className="d-inline mr-3">{post.user.name}</h3>
              {post.user.email}
            </div>
          </div>
          <hr />
          <div className="card mt-3">
            <div className="card-body">
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
              <a href={`/posts/${post.id}/edit`} className="btn btn-light mr-3">
                Edit
              </a>
              <a href="" className="btn btn-light">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowPage

const showPageDom = document.getElementById('posts-show-page')
if (showPageDom) {
  ReactDOM.render(
    <ShowPage post={JSON.parse(showPageDom.dataset.post)} />,
    showPageDom
  )
}
