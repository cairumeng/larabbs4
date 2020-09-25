import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment'

const IndexPage = ({ posts }) => {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const orderBy = urlParams.get('orderBy')

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-7 ">
          <div className="card">
            <div className="card-header">
              <a
                href="/posts?orderBy=lastReply"
                className={`btn btn-${
                  orderBy === 'lastReply' ? 'primary' : 'light'
                }`}
              >
                Last Reply
              </a>
              <a
                href="/posts?orderBy=latest"
                className={`btn btn-${
                  orderBy === 'latest' ? 'primary' : 'light'
                }`}
              >
                Last Posts
              </a>
            </div>
            <div className="card-body">
              <ul className="list-unstyled">
                {posts.data.map(post => (
                  <li key={post.id} className="mt-3">
                    <div className="media">
                      <img
                        className="mr-3 edit-avatar"
                        src={post.user.avatar}
                        alt="Generic placeholder image"
                      />
                      <div className="media-body">
                        <h5 className="mt-0">{post.title}</h5>
                        <div>
                          <i className="far fa-folder mr-2" />
                          <a href={`/posts?categoryId=${post.category_id}`}>
                            {post.category.name}
                          </a>
                          <i className="far fa-user mr-2 ml-3 mr-2" />
                          <a href={`/posts?userId=${post.user_id}`}>
                            {post.user.name}
                          </a>

                          <i className="far fa-clock mr-2 ml-3 mr-2" />
                          <Moment fromNow>{post.created_at}</Moment>
                          <i className="far fa-clock mr-2 ml-3 mr-2" />
                          <Moment fromNow>{post.updated_at}</Moment>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card">
            <div className="card-body"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default IndexPage

const IndexPageDom = document.getElementById('posts-index-page')
if (IndexPageDom) {
  ReactDOM.render(
    <IndexPage posts={JSON.parse(IndexPageDom.dataset.posts)} />,
    IndexPageDom
  )
}
