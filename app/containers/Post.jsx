import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Head } from '../components/Common/Head';
import { Loading } from '../components/Content/Loading';
import { FourOhFour } from '../components/Content/FourOhFour';

class Post extends Component {
  render() {
    const { post, loading } = this.props;
    if (loading) return <Loading />;
    if (!post) return <FourOhFour />;
    return (
      <main className="container">
        <Head title={`${post.title}`} />
        <div className="wrapper">
          <h1>{post.title}</h1>
          <p>{post.content}</p>
        </div>
      </main>
    );
  }
}

function mapStateToProps({app, loading}) {
  const { post } = app;
  return {
    loading,
    post
  };
}

export default connect(mapStateToProps, { })(Post);
