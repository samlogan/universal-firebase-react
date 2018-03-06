import React from 'react';
import { PostListItem } from './PostListItem';

export const PostList = (props) => {
  const { posts } = props;
  if (!posts) return <div>No Posts Found</div>;
  return (
    <div>
      {posts.map(post => <PostListItem post={post} key={post.uid} />)}
    </div>
  );
};
