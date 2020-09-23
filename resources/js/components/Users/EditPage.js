import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const EditPage = ({ user }) => {
    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')
    const [errors, setErrors] = useState({})

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
        setDescription(user.description)
    }, [])

    const profileEditHandler = e => {
        e.preventDefault()
        e.stopPropagation()
        axios
            .patch(`/users/${user.id}`, { name, email, description })
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

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
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
                    <div className="card-header">Edit</div>
                    <div className="card-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Username</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                                {errors.name && (
                                    <div className="text-danger">
                                        {errors.name}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="text-danger">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    row="5"
                                    placeholder="Please enter your introduction here... "
                                    value={description}
                                    onChange={e =>
                                        setDescription(e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <div className="text-danger">
                                        {errors.description}
                                    </div>
                                )}
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={profileEditHandler}
                            >
                                Edit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EditPage
const editPageDom = document.getElementById('users-edit-page')
if (editPageDom) {
    ReactDOM.render(
        <EditPage user={JSON.parse(editPageDom.dataset.user)} />,
        editPageDom
    )
}
