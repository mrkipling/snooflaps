import PropTypes from 'prop-types';
import React from 'react';

import Comment from './Comment';

class Comments extends React.Component {
  render() {
    return (
      <div className="post-comments">
        {this.props.comments.map(comment =>
          <Comment key={comment.id} comment={comment} op={this.props.op} />)}
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array,
  op: PropTypes.string,
};

export default Comments;
