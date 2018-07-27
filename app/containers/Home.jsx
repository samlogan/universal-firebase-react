import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { PostList } from '../components/Home/PostList';

// eslint-disable-next-line
class Home extends Component {
  render() {
    const { posts, loading } = this.props;
    if (loading) return <Loading />;
    return (
      <main className="container">
        <Head title="Welcome" />
        <div className="wrapper">
          <p>This is home</p>
          <PostList posts={posts} />
        </div>
      </main>
    );
  }
}

function mapStateToProps({app, loading}) {
  const { posts } = app;
  return {
    loading,
    posts
  };
}

export default connect(mapStateToProps, { })(Home);
