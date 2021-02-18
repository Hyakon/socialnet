import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

const API_URL = "http://localhost:1337/posts";
const Home = () => {
  const { id } = useParams();
  const jwt = Cookies.get("jwt");
  const currentUser = useSelector((state) => state);
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const fetchNewPost = (data) => {
    fetch(API_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        getPosts();
        fetchCountPost();
      });
  };

  const fetchCountPost = (data) => {
    fetch(API_URL + "/count", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("YOOOOOO", res);
        setCount(res);
      });
  };

  const getPosts = (id) => {
    let url = `http://localhost:1337/posts`;
    if (id) url += "?user.id=" + id;
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("posts", res);
        setPosts(res);
      });
  };

  useEffect(() => {
    getPosts(id);
    fetchCountPost();
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      text: e.target.elements.content.value,
      user: currentUser.id,
    };
    fetchNewPost(data);
  };

  return (
    <div>
      <h1>My Social Network</h1>
      <p>
        Welcome on My Social Network. This website is a training to Redux and
        React. We use auth and routing to create a small social media website.
      </p>
      <p>There is {count} posts</p>
      <div>
        {posts.map((post) => {
          return (
            <article>
              <h4>
                {post.text}
                <Link to={`/profile/${post.user.id}`}>
                  {post.user.username}
                </Link>
              </h4>
            </article>
          );
        })}
      </div>
      <h2>Add </h2>
      <form onSubmit={handleUpdate}>
        <label htmlFor="content">Post:</label>
        <input type="text" name="content" />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default Home;
