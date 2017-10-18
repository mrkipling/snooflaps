import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import AppHeader from './AppHeader';
import Subreddits from './Subreddits';
import Posts from './Posts';
import FullPost from './FullPost';

class Application extends React.Component {
  render() {
    return (!this.props.subreddits.length) ? (
      <p>Loading...</p>
    ) : (
      <div id="application">
        <AppHeader activeSubreddit={this.props.activeSubreddit} />
        <div className="u-cf">
          <Subreddits subreddits={this.props.subreddits} />
          <Posts posts={this.props.posts} />
          <FullPost post={this.props.post} />
        </div>
      </div>
    );
  }
}

Application.propTypes = {
  activeSubreddit: PropTypes.string,
  subreddits: PropTypes.array,
  posts: PropTypes.array,
  post: PropTypes.object,
};

const mapStateToProps = state => ({
  activeSubreddit: state.activeSubreddit,
  subreddits: state.subreddits,
  posts: state.subreddit ? state.subreddit : [],
  post: state.post ? state.post : {},
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Application);