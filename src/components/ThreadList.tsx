'use client'
import ThreadListItem, { Thread } from "./ThreadListItem";

interface ThreadListProps {
  threads: Thread[];
}

const ThreadList: React.FC<ThreadListProps> = ({ threads }) => {
  return (
    <div className="talks-list shadow-md">
      {threads.map((thread) => (
        <ThreadListItem key={thread.id} thread={thread} />
      ))}
    </div>
  );
};

export default ThreadList;