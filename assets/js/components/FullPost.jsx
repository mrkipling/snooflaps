import PropTypes from 'prop-types';
import React from 'react';

import Comments from './Comments';
import PostDetails from './PostDetails';
import PostMedia from './PostMedia';

class FullPost extends React.Component {
  render() {
    if (!this.props.post.comments) {
      return null;
    }

    const title = this.props.post.is_self ? (
      <span>{this.props.post.title}</span>
    ) : (
      <a href={this.props.post.url} target="_blank" rel="noopener noreferrer">{this.props.post.title}</a>
    );

    const userText = this.props.post.selftext ? (
      <div className="full-post__header__text usertext" dangerouslySetInnerHTML={{ __html: this.props.post.selftext_html }} />
    ) : null;

    return (
      <div id="full-post" className="full-post">
        <header className="full-post__header card">
          <h2 className="full-post__header__title">{title}</h2>
          <PostDetails post={this.props.post} />
          {userText}
          <PostMedia post={this.props.post} />
        </header>
        <Comments
          comments={this.props.post.comments}
          op={this.props.post.author.name}
          permalink={this.props.post.permalink}
        />
      </div>
    );
  }
}

FullPost.propTypes = {
  post: PropTypes.object,
};

export default FullPost;
