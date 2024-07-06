import React ,{useState,useEffect}from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard'
const UserBlogs = () => {
    const [blogs,setBlogs] = useState([]);

    const getUserBlog = async() =>{
        try {
            const id = localStorage.getItem('userId')
            const {data} = await axios.get(`http://localhost:8000/api/blog/user-blog/${id}`)
            // console.log(data)
            if(data?.success){
                setBlogs(data?.userBlog.blogs);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{getUserBlog()},[])    
    console.log(blogs)
  return (
    <div>
      {blogs && blogs.length >0 ?(
        blogs.map((blog)=>
          <BlogCard id={blog._id} isUser={true} title={blog.title} description={blog.description} image={blog.image} username={blog.user.username} time={blog.createdAt}/>
        )
      ):(
        <h1>You havent Created a blog</h1>
      )}
    </div>
  )
}

export default UserBlogs
