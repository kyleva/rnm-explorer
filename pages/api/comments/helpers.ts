// Types
import { Comment } from './types';

export const isCommentValid = (comment: Comment) =>
  Object.values(comment).filter(Boolean).length === 3;
