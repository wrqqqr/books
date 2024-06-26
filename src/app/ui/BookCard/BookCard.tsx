"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

const BookCard = ({ title, authors, description, imageUrl }) => {
  return (
    <Card sx={{ height: "360px" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          sx={{ height: "100%", width: "auto", objectFit: "contain" }}
          alt={title}
          image={imageUrl}
          title={title}
        />
      </Box>

      <CardContent>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" component="div">
          {authors?.join(", ")}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {description?.substring(0, 100)}...
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
