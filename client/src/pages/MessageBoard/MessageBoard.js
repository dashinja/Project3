import React, { Component } from 'react';
import API from '../../lib/API.js'
import './MessageBoard.css'



class MessageBoard extends Component {
  state = {
    title: '',
    post: '',
    posts: []
  }

  handleInputChange = event => {
    let { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  componentDidMount = () => {
    this.getPosts();
  }

  getPosts = () => {
    API.Posts.getPosts(this.state.title, this.state.post)
      .then(res => this.setState({ posts: res.data }))

  }

  handleSubmit = event => {
    event.preventDefault();
    API.Posts.sendPosts(this.state.title, this.state.post)
      .then(res => console.log(res));
  }

  render() {
    const { title, post } = this.state
    return (
      <>
        <div className="message">
          <br></br>
          <div className='navbar-brand logo' to='#'>Message Board</div>

          <div className="container">
            <div className="row">
              <div className="col-lg-12 mt-5">
                <form className="card">
                  <div className="card-body">
                    <div className='navbar-brand logo' to='#'>Add a new post</div>
                    <div className="form-group">

                      <input
                        type="text"
                        id="post-title"
                        name="title"
                        value={title}
                        onChange={this.handleInputChange}
                        className="form-control"
                        placeholder="Title"
                      />

                    </div>
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1 post-text"
                        rows="3"
                        placeholder="Post"
                        name="post"
                        value={post}
                        onChange={this.handleInputChange}
                      />

                    </div>
                    <button onClick={this.handleSubmit} id="post-button" className="btn btn-primary add-post">Post</button>
                  </div>
                </form>

              </div>
              <div className="col-lg-12 mt-5">

                <div className="page-header">
                  <div className='navbar-brand logo' to='#'>Posts</div>
                </div>
                <div className="posts">
                  <form className="card beer-form">
                    <div className="card-body">
                      <div className="form-group">
                        {this.state.posts.map(newPost => (
                          <p key={newPost.id}>
                            <h4>{newPost.title}</h4>
                            {newPost.text}
                          </p>
                        ))}
                      </div>
                      <button type="button" id="reply-button" className="btn btn-primary reply mb-2">Reply</button>
                      <button type="button" id="show-button" className="btn btn-primary show mb-2">Show Thread</button>
                      <button type="button" id="like-button" className="btn btn-success like mb-2"><i className="far fa-thumbs-up"></i> Like</button>
                      <button type="button" id="dislike-button" className="btn btn-danger dislike mb-2"><i className="far fa-thumbs-down"></i> Dislike</button>
                    </div>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </>



    );
  }
}

export default MessageBoard;