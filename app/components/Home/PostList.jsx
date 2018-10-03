import React from 'react';
import ErrorBoundary from '../Common/ErrorBoundary';
import { PostListItem } from './PostListItem';

export const PostList = (props) => {
  const { posts } = props;
  if (!posts || posts.length < 1) return <div>No Posts Found</div>;
  return (
    <div className="post-list">
      <ErrorBoundary>
        {posts.map(post => <PostListItem post={post} key={post.uid} />)}
      </ErrorBoundary>
    </div>
  );
};
