import React from 'react';
import { PostListItem } from './PostListItem';

export const PostList = (props) => {
  const { posts } = props;
  if (!posts || posts.length < 1) return <div>No Posts Found</div>;
  return (
    <div>
      {posts.map(post => <PostListItem post={post} key={post.uid} />)}
    </div>
  );
};
