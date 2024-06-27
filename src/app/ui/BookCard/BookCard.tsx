"use client";

import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";

interface BookCardProps {
  title: string;
  authors: string[];
  description: string;
  imageUrl: string;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  authors,
  description,
  imageUrl,
}) => {
  const truncatedDescription =
    description?.length > 100
      ? description.substring(0, 100) + "..."
      : description;

  return (
    <Card sx={{ display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{ width: "auto" }}
        alt={title}
        image={imageUrl}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {authors?.join(", ")}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {truncatedDescription}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
