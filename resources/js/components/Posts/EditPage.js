import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { EditorState, convertToRaw } from 'draft-js'
import { stateFromHTML } from 'draft-js-import-html'
import draftToHtml from 'draftjs-to-html'
import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './CreatePage.scss'

const EditPage = ({ post }) => {
  const [title, setTitle] = useState(post.title)
  const [category, setCategory] = useState(post.category_id)
  const [body, setBody] = useState(
    EditorState.createWithContent(stateFromHTML(post.body))
  )

  const [visibility, setVisibility] = useState(false)
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')
  const [errors, setErrors] = useState({})

  const submitHandler = e => {
    e.preventDefault()
    e.stopPropagation()
    axios
      .patch(`/posts/${post.id}`, {
        title,
        category,
        body: draftToHtml(convertToRaw(body.getCurrentContent())),
      })
      .then(res => {
        setVisibility(true)
        setType('success')
        setMessage(res.data.success)
        setErrors({})
      })
      .catch(err => {
        setErrors(err.response.data.errors)
      })
  }

  const uploadImageCallBack = file => {
    const formData = new FormData()
    formData.append('file', file)
    return axios
      .post('/upload_image', formData, {
        headers: {
          'Contente-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data
      })
  }

  return (
    <div className="container col-md-6 offset-md-3">
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
      <div className="card">
        <div className="card-header">Edit Post</div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="title">title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              {errors.title && (
                <div className="text-danger">{errors.title}</div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Category</label>
              <select
                id="category"
                name="category_id"
                className="ml-3"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="1">Share</option>
                <option value="2">Course</option>
                <option value="3">Q&A</option>
                <option value="4">Annoucement</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Body</label>

              <Editor
                editorClassName="editor"
                editorState={body}
                placeholder={post.body}
                localization={{
                  locale: 'en',
                }}
                toolbar={{
                  inline: { inDropdown: true },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: true },
                  history: { inDropdown: true },
                  image: {
                    uploadCallback: uploadImageCallBack,
                    alt: { present: true, mandatory: true },
                  },
                }}
                onEditorStateChange={editorState => setBody(editorState)}
              />
              {errors.body && <div className="text-danger">{errors.body}</div>}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitHandler}
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default EditPage
const editPageDom = document.getElementById('post-edit-page')
if (editPageDom) {
  ReactDOM.render(
    <EditPage post={JSON.parse(editPageDom.dataset.post)} />,
    editPageDom
  )
}
