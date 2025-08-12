import React from 'react'
import Navbar from '../Navbar'
import Stories from '../Stories'
import Posts from '../Posts'
import SearchResults from '../SearchResults'
function Home(props) {
  const {searchPosts} = props;
  return (
    <div>
      <Navbar />
      <Stories />
      <Posts/>
    </div>
  );
}

export default Home
