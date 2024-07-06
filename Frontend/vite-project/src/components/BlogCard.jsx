import React from 'react'; // Import React if not already imported
import { Card, CardHeader, CardMedia, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material'; // Import necessary MUI components
import ModeEditIcon from '@mui/icons-material/ModeEdit'; // Import edit icon from MUI icons
import DeleteIcon from '@mui/icons-material/Delete'; // Import delete icon from MUI icons
import { red } from '@mui/material/colors'; // Import red color from MUI colors
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from React Router DOM
import axios from 'axios'; // Import axios for making HTTP requests

const BlogCard = ({ title, description, image, username, time, id, isUser }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:8000/api/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
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
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >

      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
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

      <CardMedia component="img" height="194" image={image} alt="Blog Image" />

      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title: {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
