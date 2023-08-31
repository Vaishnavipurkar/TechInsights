import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Divider,
  Avatar,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BlogCard from "../components/BlogCard";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Your Blogs
      </Typography>
      <Divider sx={{ width: "100%" }} />

      {blogs && blogs.length > 0 ? (
        blogs.map((blog, index) => (
          <Box
            key={blog._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#f9f9f9",
              borderRadius: "5px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h6" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {blog.description}
            </Typography>
            <img
              src={blog.image}
              alt="Blog"
              style={{ cursor: "pointer", maxWidth: "100%" }}
              onClick={() => openLightbox(index)}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <IconButton color="primary">
                <ThumbUpIcon />
              </IconButton>
              <IconButton color="secondary">
                <ThumbDownIcon />
              </IconButton>
              <IconButton color="info">
                <FeedbackIcon />
              </IconButton>
            </Box>
          </Box>
        ))
      ) : (
        <h1 style={{ textAlign: "center", margin: "auto", width: "100%" }}>
          You Haven't Created a Blog
        </h1>
      )}

      {lightboxOpen && (
        <Lightbox
          mainSrc={blogs[lightboxIndex].image}
          onCloseRequest={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
};

export default UserBlogs;
