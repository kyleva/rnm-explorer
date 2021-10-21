// Types
import { Comment } from '../api/comments/types';

const Comments = ({ comments }: { comments: Comment[] }) => (
  <div className="mb-4">
    {comments.map(({ body, id, title }) => (
      <div className="pb-4 mb-4 border-b" key={`comment-${id}`}>
        <p>
          <strong>{title}</strong>
        </p>
        <p>{body}</p>
      </div>
    ))}{' '}
  </div>
);

export default Comments;
