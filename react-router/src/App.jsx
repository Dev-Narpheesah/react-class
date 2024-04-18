import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./About";
import Footer from "./Footer";
import Header from "./Header";
import Home from "./Home";
import Missing from "./Missing";
import Nav from "./Nav";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import { useState, useEffect } from "react";
import {format} from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta porro id nam nobis tenetur placeat, repellendus, possimus in dignissimos explicabo, repudiandae non quaerat assumenda doloremque tempora nisi nesciunt quibusdam!"
    },
    {
      id: 2,
      title: "My Second Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta porro id nam nobis tenetur placeat, repellendus, possimus in dignissimos explicabo, repudiandae non quaerat assumenda doloremque tempora nisi nesciunt quibusdam!"
    },
    {
      id: 3,
      title: "My Third Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta porro id nam nobis tenetur placeat, repellendus, possimus in dignissimos explicabo, repudiandae non quaerat assumenda doloremque tempora nisi nesciunt quibusdam!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta porro id nam nobis tenetur placeat, repellendus, possimus in dignissimos explicabo, repudiandae non quaerat assumenda doloremque tempora nisi nesciunt quibusdam!"
    },
    {
      id: 5,
      title: "My Fifth Post",
      dateTime: "April 04, 2024 11:01:34 AM",
      body: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dicta porro id nam nobis tenetur placeat, repellendus, possimus in dignissimos explicabo, repudiandae non quaerat assumenda doloremque tempora nisi nesciunt quibusdam!"
    },
  ]);
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([])
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');


  useEffect (() => {
    const filteredResult = posts.filter((post) => 
    ((post.body).toLowerCase()).includes(search.toLowerCase()) ||
    ((post.title).toLowerCase()).includes(search.toLowerCase()) )

    setSearchResult(filteredResult.reverse())
  }, [posts, search])

const handleSubmit = (e) => {
  e.preventDefault();

  const id = posts.length ? posts[posts.length -1].id + 1 : 1
  const dateTime = format(new Date(), `MMMM dd, yyy pp`)
  const newPost = {id, title: postTitle, dateTime, body:postBody}
  const allPosts =[...posts, newPost]
  setPosts(allPosts);
  setPostTitle('');
  setPostBody('')

  navigate('/')
}
  const handleDelete = (id) => {
    const postList = posts.filter(post => post.id !== id)
    setPosts(postList)
    navigate('/')
  }

  return (
    <div className="App">
      <Header title="DLT Blogs" />
      <Nav search={search} setSearch={setSearch}/>
      <Routes>
        <Route path="/" element={<Home posts={searchResult}/>} />

        <Route path="/post" element={<NewPost 
         handleSubmit={handleSubmit} 
        postTitle={postTitle} 
        setPostTitle={setPostTitle}
        postBody={postBody}
        setPostBody={setPostBody}/>} />

        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete}/>} />
        <Route path="/about" element={<About />} />

        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
