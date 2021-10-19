import { COMMENTS_API } from './constants';

export const createPost = ({
  body,
  title,
  residentId: userId,
}: {
  body: string;
  title: string;
  residentId: number;
}) =>
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
  });

export const getCommentsByResidentId = (id: number) =>
  fetch(`${COMMENTS_API}?userId=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => res.data);
