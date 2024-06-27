// components/ui/GenreSelect/GenreSelect.tsx
"use client";

import React from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const genres = [
  "Fiction",
  "Mystery",
  "Fantasy",
  "Science Fiction",
  "Romance",
  "Horror",
  "Thriller",
  "Historical",
  "Biography",
  "Self-help",
];

interface GenreSelectProps {
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
}

const GenreSelect: React.FC<GenreSelectProps> = ({
  selectedGenre,
  setSelectedGenre,
}) => {
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedGenre(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" fullWidth>
      <InputLabel>Genre</InputLabel>
      <Select value={selectedGenre} onChange={handleChange} label="Genre">
        {genres.map((genre) => (
          <MenuItem key={genre} value={genre}>
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default GenreSelect;
