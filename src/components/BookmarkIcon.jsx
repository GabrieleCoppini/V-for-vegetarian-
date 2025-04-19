
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addBookmark, removeBookmark, selectAllBookmarks } from '../stores/BookMarksSlice';

const BookmarkIcon = ({ recipe }) => {
  const dispatch = useDispatch();
  const bookmarks = useSelector(selectAllBookmarks);
  const isBookmarked = bookmarks.some((bookmark) => bookmark.title === recipe.title);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      dispatch(removeBookmark(recipe.title));
    } else {
      dispatch(addBookmark(recipe));
    }
  };

  return (
    <div onClick={handleBookmarkToggle}>
      {isBookmarked ? (
        <FaHeart color="red" size="1.5em" />
      ) : (
        <FaRegHeart size="1.5em" />
      )}
    </div>
  );
};

export default BookmarkIcon;