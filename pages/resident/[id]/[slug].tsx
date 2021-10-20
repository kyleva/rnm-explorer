import Image from 'next/image';
import { FormEventHandler, useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';

import { Comment } from '../../api/comments';

import { getResidentById, Resident } from '../../api/resident';
import {
  createComment,
  getCommentsByResidentId,
  isCommentValid,
} from '../../api/comments';

const ResidentPage = () => {
  const router = useRouter();

  const [comments, setComments] = useState([] as Comment[]);
  const [isLoading, setIsLoading] = useState(true);
  const [resident, setResident] = useState({} as Resident);

  const [newCommentBody, setNewCommentBody] = useState('');
  const [newCommentTitle, setNewCommentTitle] = useState('');

  const id = router.query.id as string;

  useEffect(() => {
    // Don't execute side effect on first render
    if (!id) return;

    getResidentById(id).then((response) => {
      setResident(response.character);
      setIsLoading(false);
    });

    Promise.all([getResidentById(id), getCommentsByResidentId(id)]).then(
      ([residentResponse, commentsResponse]) => {
        setResident(residentResponse.character);
        setComments(commentsResponse);

        setIsLoading(false);
      }
    );
  }, [id]);

  const handleAddComment: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    const comment: Comment = {
      body: newCommentBody,
      userId: Number(id),
      title: newCommentTitle,
    };

    // If comment is not valid don't attempt to add it
    if (!isCommentValid(comment)) return;

    /**
     * Create copy of current comments on page
     */
    const previousComments = comments.slice();

    /**
     * Optimistically add comment to UI
     */
    setComments(comments.concat(comment));
    setNewCommentBody('');
    setNewCommentTitle('');

    createComment(comment).catch(() => {
      /**
       * If there's an error adding the comment repopulate text inputs
       */
      setNewCommentBody(comment.body);
      setNewCommentTitle(comment.title);

      /**
       * It'd also be appropriate to add some error messages
       */
      // invokeFunctionThatShowsValidationMessages();

      /**
       * Remove comment that actually wasn't added to back-end
       */
      setComments(previousComments);
    });
  };

  return (
    <div className="container px-4 mx-auto my-4">
      {isLoading && <div>Loading...</div>}

      {!isLoading && (
        <>
          <p className="mb-4">
            <span onClick={() => router.back()}>&laquo; Back</span>
          </p>
          <div className="md:float-right">
            <Image
              src={resident.image}
              className="max-w-full"
              height="200"
              width="200"
            />
          </div>

          <h1 className="mb-6 text-lg">{resident.name}</h1>

          <p className="mb-2">
            <strong>Status:</strong> {resident.status}
          </p>

          <p className="mb-2">
            <strong>Species:</strong> {resident.species}
          </p>

          <p className="mb-2">
            <strong>Gender:</strong> {resident.gender}
          </p>

          <p className="mb-2">
            <strong>Last known location:</strong> {resident.location.name}
          </p>

          <p className="mb-2">
            <strong>Birth location:</strong> {resident.origin.name}
          </p>

          <div className="flow-root clear-both pt-6 mt-8 border-t">
            {comments.length > 0 && (
              <div className="mb-4">
                {comments.map((comment) => (
                  <div
                    className="pb-4 mb-4 border-b"
                    key={`comment-${comment.id}`}
                  >
                    <p>
                      <strong>{comment.title}</strong>
                    </p>
                    <p>{comment.body}</p>
                  </div>
                ))}{' '}
              </div>
            )}

            <p className="mb-4">
              <strong>What're your thoughts on {resident.name}?</strong>
            </p>
            <form className="block" onSubmit={handleAddComment}>
              <label htmlFor="comment-title mb-4">
                <span className="block">Title</span>
                <input
                  id="comment-title"
                  className="block w-full p-3 border rounded"
                  name="title"
                  onChange={(event) => setNewCommentTitle(event.target.value)}
                  type="text"
                  value={newCommentTitle}
                />
              </label>

              <label className="block mt-4" htmlFor="comment-body">
                <span className="block">Body</span>
                <input
                  id="comment-body"
                  className="block w-full p-3 border rounded"
                  name="body"
                  onChange={(event) => setNewCommentBody(event.target.value)}
                  type="text"
                  value={newCommentBody}
                />
              </label>

              <button
                className="block p-3 mt-4 border rounded cursor-pointer"
                type="submit"
              >
                Add comment
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ResidentPage;
