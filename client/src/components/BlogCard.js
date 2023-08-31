import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const [showFullBlog, setShowFullBlog] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 2,
        padding: 2,
        boxShadow: "5px 5px 10px #ccc",
        ":hover:": {
          boxShadow: "10px 10px 20px #ccc",
        },
        backgroundColor: "#fff",
        borderRadius: "10px",
      }}
    >
      {isUser && (
        <Box display="flex">
          <IconButton
            onClick={handleEdit}
            sx={{
              marginLeft: "auto",
              ":hover": {
                color: "info.main",
                backgroundColor: "transparent",
              },
            }}
          >
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            sx={{
              ":hover": {
                color: "error.main",
                backgroundColor: "transparent",
              },
            }}
          >
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="Blog" />
      <CardContent
        sx={{
          padding: "1rem",
        }}
      >
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            marginBottom: "1rem",
            fontSize: "1.2rem",
          }}
        >
          Title: {title}
        </Typography>
        {showFullBlog ? (
          <>
            <Typography variant="body2" color="text.secondary">
              Description: {description}
            </Typography>
            <span
              style={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
                marginLeft: "0.5rem",
              }}
              onClick={() => setShowFullBlog(false)}
            >
              Read less
            </span>
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Description: {description.slice(0, 100)}...{" "}
              <span
                style={{
                  cursor: "pointer",
                  color: "blue",
                  textDecoration: "underline",
                  marginLeft: "0.5rem",
                }}
                onClick={() => setShowFullBlog(true)}
              >
                Read more
              </span>
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
}