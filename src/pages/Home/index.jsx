import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const API_URL = "http://localhost:1337/posts";
const Home = (props) => {
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

  const getPosts = () => {
    fetch(API_URL, {
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
    getPosts();
    fetchCountPost();
  }, []);

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
          return <h1>{post.text}</h1>;
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
