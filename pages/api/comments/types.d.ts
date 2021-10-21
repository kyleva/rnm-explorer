export type CommentsResponse = Comment[];

export type Comment = {
  id?: number;
  body: string;
  title: string;
  userId: number;
};
