import { FormEvent } from 'react';

type ResidentCommentFormProps = Partial<HTMLFormElement> & {
  newCommentBody: string;
  newCommentTitle: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setNewCommentBody: (newCommentBody: string) => void;
  setNewCommentTitle: (newCommentTitle: string) => void;
};

const ResidentCommentForm = ({
  newCommentBody,
  newCommentTitle,
  onSubmit,
  setNewCommentBody,
  setNewCommentTitle,
}: ResidentCommentFormProps) => (
  <form className="block" onSubmit={onSubmit}>
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
);

export default ResidentCommentForm;
