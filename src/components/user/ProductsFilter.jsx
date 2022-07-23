import { useEffect, useState } from "react";
import Axios from "axios";
import {
  Box,
  Stack,
  Button,
  FormLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  autocompleteClasses,
  Typography,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ProductsFilter() {
  const [search, setSearch] = useSearchParams();
  const [category, setCategory] = useState([]);

  const searchTerm = search.get("filter") || "";
  const searchCate = search.get("category") || "";
  const searchSort = search.get("sort") || "";

  useEffect(() => {
    Axios.get(process.env.REACT_APP_API + "/admin/categories")
      .then((res) => {
        setCategory(() => res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSearch = (event) => {
    const filter = event.target.value;
    if (filter) {
      setSearch({ filter: filter, category: searchCate, sort: searchSort });
    } else {
      setSearch({});
    }
  };

  const handleAll = (e) => {
    const category = e.target.value;
    if (category) {
      setSearch({ filter: searchTerm, category: category, sort: searchSort });
    } else {
      setSearch({});
    }
  };

  const handleSort = (e) => {
    const sort = e.target.value;
    if (sort) {
      setSearch({ filter: searchTerm, category: searchCate, sort: sort });
    } else {
      setSearch({});
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        height: autocompleteClasses,
        backgroundColor: "rgb(245,251,253)",
        padding: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" marginBottom="10px">
        Filter Products
      </Typography>
      <hr color="green" />
      <TextField
        onChange={handleSearch}
        fullWidth
        margin="dense"
        label="Search For Name"
        variant="outlined"
      />
      <FormControl>
        <FormLabel>Category</FormLabel>
        <RadioGroup defaultValue="all" name="radio-buttons-group">
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All"
            onClick={handleAll}
          />
          {category.map((cat) => (
            <FormControlLabel
              value={cat.categoryId}
              control={<Radio />}
              label={cat.categoryName}
              onClick={handleAll}
            />
          ))}
          {/* <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
            onClick={handleAll}
          /> */}
        </RadioGroup>
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Sort by</FormLabel>
        <Select
          id="demo-simple-select"
          //   value="sort"
          onChange={handleSort}
          //   label="Sort"
          defaultValue="latest"
          // onChange={handleChange}
        >
          <MenuItem value="latest">Latest</MenuItem>
          <MenuItem value="high price">Highest Price</MenuItem>
          <MenuItem value="low price">Lowest Price</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
