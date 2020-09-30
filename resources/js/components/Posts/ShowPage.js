import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment'
import Pagination from '../util/Pagination'
const ShowPage = ({ post, authUser, replies }) => {
  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [errors, setErrors] = useState({})

  const deleteHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    axios
      .delete(`/posts/${post.id}`)
      .then(res => {
        setVisibility(true)
        setType('success')
        setMessage(res.data.success)
        setErrors({})
        window.location.href = `/posts`
      })
      .catch(err => {
        setErrors(err.response.data.errors)
      })
  }
  return (
    <div className="container">
      {visibility && (
        <div className={`alert alert-${type}`}>
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <p>{message}</p>
        </div>
      )}
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
              {authUser.id === post.user.id && (
                <div>
                  <a
                    href={`/posts/${post.id}/edit`}
                    className="btn btn-light mr-3"
                  >
                    Edit
                  </a>
                  <form className="d-inline">
                    <a className="btn btn-light" onClick={deleteHandler}>
                      Delete
                    </a>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <ul className="list-unstyled">
                {replies.data.map(reply => (
                  <li key={reply.id} className="mt-3">
                    <div className="media">
                      <a href={`/users/${reply.user_id}`}>
                        <img
                          className="mr-3 edit-avatar"
                          src={reply.user.avatar}
                          alt="Generic placeholder image"
                        />
                      </a>
                      <div className="media-body">
                        <div className="mt-0">
                          <a href={`/users/${reply.user_id}`}>
                            {reply.user.name}
                          </a>
                          <div className="d-inline">
                            <i className="far fa-clock mr-2 ml-3 mr-2" />
                            <Moment fromNow>{reply.created_at}</Moment>
                          </div>
                          <div className="d-inline float-right">
                            <i className="far fa-trash-alt"></i>
                          </div>
                        </div>
                        <div>{reply.content}</div>
                      </div>
                    </div>
                  </li>
                ))}
                <div className="pagination justify-content-center">
                  <Pagination paginator={replies} />
                </div>
              </ul>
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
    <ShowPage
      post={JSON.parse(showPageDom.dataset.post)}
      authUser={JSON.parse(showPageDom.dataset.authUser)}
      replies={JSON.parse(showPageDom.dataset.replies)}
    />,
    showPageDom
  )
}
