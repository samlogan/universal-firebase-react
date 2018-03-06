import React from 'react';
import { Link } from 'react-router-dom';

export const PostListItem = (props) => {
  const { post } = props;
  return (
    <div>
      <Link to={`/posts/${post.uid}`}>{post.title}</Link>
    </div>
  );
};
