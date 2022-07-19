import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllComments } from '../../lib/api';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';
import LoadingSpinner from '../UI/LoadingSpinner';

import useHttp from '../../hooks/use-http';


const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const { sendRequest, status, data: loadedComments, error } = useHttp(getAllComments, true)

  const params = useParams();
  const { quoteId } = params

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addedCommentHandler = useCallback(() => {
    setIsAddingComment(false)
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  let comments = ''

  if (status === 'pending') {

    comments =  <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (error) {
    comments = <p>Error loading comments</p>
  }

  if (status === 'completed' && (loadedComments && loadedComments.length > 0)) {
    comments = <CommentsList comments={loadedComments} />
  }
  

  if (status === 'completed' && (!loadedComments || loadedComments.length === 0)) {
    comments = <p className='centered'>No comments were added yet!</p>
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} onAddedComment={addedCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
