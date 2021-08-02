import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router";
import { updateDestFeed, getDestFeed } from "../../store/destination";

function EditPost({ id, payload }) {
  // const {id} = useParams()
  const dispatch = useDispatch();
  const [postText, setPostText] = useState("");
  // const { id } = useParams()
  // const history = useHistory()
  // console.log(id)
  const onSubmit = (e) => {
    e.preventDefault();
      dispatch(updateDestFeed(id, postText));
      dispatch(getDestFeed(payload));
    // history.push(`/images/${id}`)
  };
//   console.log("**********************", id, postText, payload);


  return (
    <div className="wrapper-upload">
      <form onSubmit={onSubmit} className="upload-form">
        {/* <label className='upload-img-txt'>
                Edit Your Post

            </label> */}
        <label>
          <textarea
            className="txt-area"
            placeholder="Edit Post"
            type="text"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            required
            rows="3"
            cols="20"
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
