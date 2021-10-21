import { FormEventHandler, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

// Components
import Loader from '../../components/Loader';
import ResidentComments from '../../components/ResidentComments';
import ResidentCommentForm from '../../components/ResidentCommentForm';
import ResidentDetails from '../../components/ResidentDetails';
// Helpers
import {
  createComment,
  getCommentsByResidentId,
} from '../../api/comments/comments';
import { getResidentById } from '../../api/resident/resident';
import { isCommentValid } from '../../api/comments/helpers';
// Types
import { Comment } from '../../api/comments/types';
import { Resident } from '../../api/resident/types';

const ResidentPage = () => {
  const router = useRouter();

  const [comments, setComments] = useState([] as Comment[]);
  const [isLoading, setIsLoading] = useState(true);
  const [resident, setResident] = useState({} as Resident);

  const [newCommentBody, setNewCommentBody] = useState('');
  const [newCommentTitle, setNewCommentTitle] = useState('');

  const id = router.query.id as string;

  useEffect(() => {
    // Don't execute side effect on first render (url prop not available)
    if (!Boolean(id)) return;

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

  useEffect(() => {
    if (!Boolean(resident.name)) return;
    document.title = `${resident.name} | Rick and Morty Explorer`;
  }, [resident]);

  /**
   * Would prefer to manage this side effect somewhere else and not bloat the
   * component but given the way this is set up at the moment it's easier
   * to leave it in here.
   */
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

  if (isLoading) return <Loader />;

  return (
    <div className="container px-4 mx-auto my-4">
      <>
        <p className="mb-4">
          <span className="cursor-pointer" onClick={() => router.back()}>
            <a>&laquo; Back</a>
          </span>
        </p>

        <ResidentDetails {...resident} />

        <div className="flow-root clear-both pt-6 mt-8 border-t">
          {comments.length > 0 && <ResidentComments comments={comments} />}

          <p className="mb-4">
            <strong>What're your thoughts on {resident.name}?</strong>
          </p>

          <ResidentCommentForm
            onSubmit={handleAddComment}
            setNewCommentBody={setNewCommentBody}
            setNewCommentTitle={setNewCommentTitle}
            newCommentBody={newCommentBody}
            newCommentTitle={newCommentTitle}
          />
        </div>
      </>
    </div>
  );
};

export default ResidentPage;
