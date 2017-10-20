import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { plural } from '../utils';
import { fetchMoreComments } from '../actions/postActions';

class Comment extends React.Component {
  render() {
    const comment = this.props.comment;
    const score = this.props.comment.score;

    let authorCssClass = 'comment__header__author';

    if (this.props.op === comment.author.name) {
      authorCssClass += ' is-op';
    }

    const moreComments = (comment.replies && comment.replies._more && comment.replies._more.children.length) ? (
      <div
        className="comment__more-comments"
        onClick={() => this.props.fetchMoreComments(comment)}
      >
        load more comments
        <span> ({comment.replies._more.count} replies)</span>
      </div>
    ) : null;

    const continueThread = (comment.replies && !comment.replies.length && comment.replies._query.comment) ? (
      <a
        className="comment__continue-thread"
        href={'https://www.reddit.com/' + this.props.permalink + comment.replies._query.comment}
        target="_blank"
        rel="noopener noreferrer"
      >
        Continue this thread
      </a>
    ) : null;

    return (
      <div className="comment">
        <header className="comment__header">
          <span className={authorCssClass}>
            <a href={'https://www.reddit.com/u/' + this.props.comment.author.name}>
              {this.props.comment.author.name}
            </a>
          </span>
          <span className="comment__header__votes">{score + ' ' + plural(score, ['vote', 'votes'])}</span>
        </header>
        <div className="usertext" dangerouslySetInnerHTML={{ __html: this.props.comment.body_html }} />
        {comment.replies && comment.replies.map(comm => (
          <Comment
            key={comm.id}
            comment={comm}
            op={this.props.op}
            permalink={this.props.permalink}
            fetchMoreComments={this.props.fetchMoreComments}
          />
        ))}
        {moreComments}
        {continueThread}
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object,
  op: PropTypes.string,
  permalink: PropTypes.string,
  fetchMoreComments: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  fetchMoreComments: comment =>
    dispatch(fetchMoreComments(comment)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
