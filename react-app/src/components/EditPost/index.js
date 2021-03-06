/* eslint-disable */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDestFeed } from "../../store/destination";

function EditPost({ id, payload }) {
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateDestFeed(id, postText));
  };

  return (
    <div className="wrapper-upload">
      <form onSubmit={onSubmit} className="upload-form">
        <label>
          <input
            className="txt-area"
            placeholder="Edit Post"
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
            rows="1"
            cols="20"
            style={{height: '20px'}}
          />
        </label>
        <button className="upload-btn" type="submit">
          Post!
        </button>
      </form>
    </div>
  );
}
export default EditPost;
