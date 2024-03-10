import CommentsItem, { Comment } from "./CommentItem";

interface CommentsList {
  comments: Comment[];
  threadId: string;
}

const CommentsList: React.FC<CommentsList> = ({ comments, threadId }) => {
  const countComment = comments.length;
  return (
    <>
      { comments.map((comment, index) => (
        <CommentsItem key={comment.id} comment={comment} lastIndex={index + 1 === comments.length} threadId={threadId} />
      ))
      }
    </>
  );
}

export default CommentsList;