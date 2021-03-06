// Constants
import { COMMENTS_API } from '../constants';
// Types
import { CommentsResponse } from './types';

export const createComment = ({
  body,
  title,
  userId,
}: {
  body: string;
  title: string;
  userId: number;
}): Promise<CommentsResponse> =>
  fetch(`${COMMENTS_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      body,
      title,
      userId,
    }),
  }).then((res) => res.json());

export const getCommentsByResidentId = (id: string) =>
  fetch(`${COMMENTS_API}?userId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
