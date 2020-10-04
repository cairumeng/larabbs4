import React from 'react'
import ReactDOM from 'react-dom'
import Moment from 'react-moment'
import Pagination from '../util/Pagination'

const IndexPage = ({ notifications }) => {
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1 text-center">
        <div className="card">
          <h3>
            <i className="far fa-bell"></i>
            Notifications
          </h3>
          <hr />
          <ul className="list-unstyled">
            {notifications.data.map(notification => (
              <li key={notification.id} className="mt-3">
                <div className="row">
                  <div className="col-md-2">
                    <img
                      className="edit-avatar img-thumbnail"
                      src={notification.data.user_avatar}
                      alt="Generic placeholder image"
                    />
                  </div>
                  <div className="col-md-8">
                    <h5>
                      {' '}
                      <a href={`/users/${notification.data.user_id}`}>
                        {notification.data.user_name}
                      </a>{' '}
                      replied
                      <a href={`/posts/${notification.data.post_id}`}>
                        {'' + notification.data.post_title}
                      </a>
                    </h5>
                    <div className="d-inline">
                      {notification.data.reply_content}
                    </div>
                  </div>
                  <div className="col-md-2">
                    <Moment fromNow>{notification.created_at}</Moment>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default IndexPage

const indexPageDom = document.getElementById('notifications-index-page')
if (indexPageDom) {
  ReactDOM.render(
    <IndexPage
      notifications={JSON.parse(indexPageDom.dataset.notifications)}
    />,
    indexPageDom
  )
}
