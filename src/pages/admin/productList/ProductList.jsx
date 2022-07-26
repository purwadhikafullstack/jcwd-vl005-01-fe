import Topbar from "../../../components/admin/topbar/Topbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Axios from "axios";
import React from "react";
import styled from "styled-components";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import Confirmation from "../../../components/admin/alert/Confirmation";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CategoryList from "../categoryList/categoryList";

const Container = styled.div`
    padding: 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Title = styled.h2`
  margin: 10px;
  font-weight: normal;
`;


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  age: null
};

const CloseBtn = styled.button`
  background-color: white;
  border:none;
`;

const Input = styled('input')({
  display: 'none',
});
class ProductList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
        dbProduct:[],
        dbCategory:[],
        deleteId: '',
        editId: '',
        alertDelete: false,
        addOpen: false,
        name: null,
        price: null,
        weight_gram: null,
        description: null,
        img_url: null,
        categoryId: '',
        editOpen: false,
        openImage: false,
        pagination:5
    }
  }

  componentDidMount() {
    this.getProductList();
    this.getCategories();
  }

  getProductList = () => {
    Axios.get(process.env.REACT_APP_API+'/admin/products')
    .then((response) => {
        this.setState({dbProduct: response.data})
    })
    .catch(err=> {
        console.log(err);
    })
  }

  onButtonDelete = (event, cellValues) => {
      this.setState({deleteId: cellValues.id});
      this.setState({alertDelete: true});
  }

  onButtonCancelDelete = () => {
    this.setState({alertDelete: false});
    this.setState({deleteId: null});
  }

  onButtonConfirmDelete = () => {
    this.setState({alertDelete: false});

    Axios.delete(process.env.REACT_APP_API + `/admin/products/${this.state.deleteId}`)
    .then((response) => {
      alert('Successfully Deleted!');
      this.getProductList();
      this.setState({deleteId: null});
    })
    .catch((err) =>{
      console.log(err);
      alert(err);
      this.setState({deleteId: null});
    })
  }

  btnCancel = () => {
    this.setState({addOpen: true})
    this.setState({name: null})
    this.setState({price: null})
    this.setState({weight_gram: null})
    this.setState({describe: null})
    this.setState({img_url: null})
    this.setState({categoryId: null})
  }

  addProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("price", this.state.price);
    formData.append("weight_gram",this.state.weight_gram);
    formData.append("description", this.state.description);
    formData.append("file", this.state.img_url);
    formData.append("categoryId", this.state.categoryId)
   
    console.log(formData);

    Axios.post(process.env.REACT_APP_API+`/admin/products/${this.state.editId}`, formData)
    .then((response) => {
        console.log("Successfully Added New Product!");
        this.setState({addOpen: false});
        alert('Successfully Added New Product!');
        this.setState({name: null})
        this.setState({price: null})
        this.setState({weight_gram: null})
        this.setState({description: null})
        this.setState({img_url: null})
        this.setState({categoryId: null})
        this.getProductList();
        
    })
    .catch(err => {
        console.log(err);
        alert(err)
        this.setState({name: null})
        this.setState({price: null})
        this.setState({weight_gram: null})
        this.setState({description: null})
        this.setState({img_url: null})
        this.setState({categoryId: null})
    })
  }

  onButtonCancelEdit = () => {
    this.setState({editId: null});
  }
  
  editProduct = () => {
      const formData = new FormData();
      formData.append("name", this.state.name);
      formData.append("price", this.state.price);
      formData.append("weight_gram",this.state.weight_gram);
      formData.append("description", this.state.description);
      formData.append("file", this.state.img_url);
      formData.append("categoryId", this.state.categoryId);
      // {name: this.state.name, price: this.state.price, weight_gram:this.state.weight_gram, description: this.state.description, file: this.state.img_url, categoryId: this.state.categoryId}
      Axios.patch(process.env.REACT_APP_API+`/admin/products/${this.state.editId}`, formData)
      .then((response) => {
          alert('Successfully Updated Product');
          this.setState({editOpen: false});
          this.setState({editId: null})
          this.setState({name: null})
          this.setState({price: null})
          this.setState({weight_gram: null})
          this.setState({description: null})
          this.setState({img_url: null})
          this.setState({categoryId: null})
          this.getProductList();
          
      })
      .catch((err) => {
          console.log(err);
          alert(err)
          this.setState({editId: null})
          this.setState({name: null})
          this.setState({price: null})
          this.setState({weight_gram: null})
          this.setState({description: null})
          this.setState({img_url: null})
          this.setState({categoryId: null})
      })

  }

  onButtonEdit = (event, cellValues) => {
    this.setState({editId: cellValues.id});
    this.setState({editOpen: true});
  }

  handleUserInput (e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value});
  }

  getCategories = () => {
    Axios.get(process.env.REACT_APP_API+'/admin/categories')
    .then((response) => {
        this.setState({dbCategory: response.data})
    })
    .catch(err => {
      console.log(err);
    })
  }
  
  printCategory = () => {
    return this.state.dbCategory.map((item, index) => {
      return(
            <MenuItem value={item.categoryId}>{item.categoryName}</MenuItem>
        )
      })
  }
  render(){
    const columns = [
      {
        field : 'img_url', 
        headerName: 'Image', 
        width:120,
        renderCell: (cellValues) => {
          return(
              <div>
                <img src={`${cellValues.row.img_url}`} width='50px' height='70'/>
              </div>
          )
        }
      },
      {field : 'id', headerName: 'Products ID', width:120},
      {field : 'name', headerName: 'Products Name', width:350},
      {field : 'price', headerName: 'Price', width:150},
      {field : 'weight_gram', headerName: 'Weight (Gram)', width:150},
      {field : 'description', headerName: 'Details', width:500},
      {field : 'categoryName', headerName: 'Category Name', width:200},
      {
        field: "Action",
        width:250,
        sortable: false,
        renderCell: (cellValues) => {
          return (
            <div>
              <Stack spacing='20px' direction="row">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={(event) => {
                      this.onButtonDelete(event, cellValues);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                  variant="contained"
                  color="warning"
                  onClick={(event) => {
                    this.onButtonEdit(event, cellValues);
                  }}
                >
                  Edit
                </Button>
              </Stack>
            </div>
            
          );
        }
      }

    ]
    
    return (
      <Container>
        <Box display="flex" flexDirection="column">
          <Box sx={{marginBottom: '20px'}}>
            <Title>Catogory Product</Title>
            <CategoryList/>
          </Box>
          <Box>
              <Button size="small" onClick={() => this.btnCancel()}><AddIcon/>Add Products</Button>
          </Box>
        </Box>
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Modal
            open={this.state.addOpen}
          >
            <Box sx={style}>
            <Box position='absolute' right='5%'>
                  <CloseBtn onClick={()=> this.setState({addOpen: false})}><CloseIcon sx={{color: '#008080'}}/></CloseBtn>
                </Box>
                <Box marginTop='30px'>
                  <Typography id="modal-modal-title" variant="h6" component="h2" color='#008080' textAlign='center' fontWeight='bold'>
                    Insert New Product
                  </Typography>
                  <br/>
                  <Stack spacing='20px'>
                    
                    <FormControl>
                      <TextField fullWidth label="Product Name" id="name"
                        onChange ={(event) => this.handleUserInput(event)}
                        value = {this.state.name}
                        size='small'
                        name="name"
                        required
                      />
                    </FormControl>

                    <FormControl>
                        <TextField fullWidth label="Price" id="price"
                          onChange ={(event) => this.handleUserInput(event)}
                          value = {this.state.price}
                          size='small'
                          name="price"
                          required
                        />
                    </FormControl>
                    
                    <FormControl>
                      <TextField fullWidth label="Weight(Gram)" id="weight_gram"
                        onChange ={(event) => this.handleUserInput(event)}
                        value = {this.state.weight_gram}
                        size='small'
                        name="weight_gram"
                        required
                      />
                    </FormControl>

                   <FormControl>
                      <TextField fullWidth label="Description" id="description"
                        onChange ={(event) => this.handleUserInput(event)}
                        value = {this.state.description}
                        size='small'
                        name="description"
                        required
                      />
                   </FormControl>

                    <FormControl>
                      <InputLabel id="category-select">Category</InputLabel>
                      <Select
                        labelId="category-select"
                        id="categoryId"
                        value={this.state.categoryId}
                        label="Category"
                        onChange={(event) => this.handleUserInput(event)}
                        name="categoryId"
                        size= 'medium'
                        required
                      >
                        {this.printCategory()}
                      </Select>
                    </FormControl>

                    <InputLabel id="upload-image" required>Upload Image</InputLabel>
                    <Box color='neutral' display='flex' flex-direction='row' justifyContent='center' alignItems='center' width='100%' height='100px' border='1px dotted #508dcd'>
                      <label htmlFor="productMenu">
                        <Input accept="image/*" id="productMenu" multiple type="file" onChange={(e) => this.setState({img_url: e.target.files[0]})}/>
                        <Button variant="contained" component="span" sx={{backgroundColor: '#90caf9'}}>
                          Upload
                        </Button>
                      </label>
                    </Box>

                    <Box mt='10px' display='flex' justifyContent='center'>
                      <Button variant="contained" onClick={this.addProduct}>ADD PRODUCT</Button>
                    </Box>
                  </Stack>
                </Box>
            </Box>
          </Modal>
          <Modal
            open={this.state.editOpen}
          >
            <Box sx={style}>
                <Box position='absolute' right='5%'>
                  <CloseBtn onClick={()=> this.setState({editOpen: false})}><CloseIcon sx={{color: '#008080'}}/></CloseBtn>
                </Box>
                <Box marginTop='30px'>
                  <Typography id="modal-modal-title" variant="h6" component="h2" color='#008080' textAlign='center' fontWeight='bold'>
                    Edit Product
                  </Typography>
                  <br/>
                  <Stack spacing='20px'>
                    
                    <TextField fullWidth label="Product Name" id="name"
                      onChange ={(event) => this.handleUserInput(event)}
                      value = {this.state.name}
                      size='small'
                      name="name"
                    />

                   
                    <TextField fullWidth label="Price" id="price"
                      onChange ={(event) => this.handleUserInput(event)}
                      value = {this.state.price}
                      size='small'
                      name="price"
                    />
                    
                    
                    <TextField fullWidth label="Weight(Gram)" id="weight_gram"
                      onChange ={(event) => this.handleUserInput(event)}
                      value = {this.state.weight_gram}
                      size='small'
                      name="weight_gram"
                    />

                   
                    <TextField fullWidth label="Description" id="description"
                      onChange ={(event) => this.handleUserInput(event)}
                      value = {this.state.description}
                      size='small'
                      name="description"
                    />
                    
                    <InputLabel id="category-select">Category</InputLabel>
                    <Select
                      labelId="category-select"
                      id="categoryId"
                      value={this.state.categoryId}
                      label="Category"
                      onChange={(event) => this.handleUserInput(event)}
                      name="categoryId"
                      size='small'
                    >
                       {this.printCategory()}
                    </Select>

                    <InputLabel id="category-select">Upload Image</InputLabel>
                    <Box color='neutral' display='flex' flex-direction='row' justifyContent='center' alignItems='center' width='100%' height='100px' border='1px dotted #508dcd'>
                      <label htmlFor="productMenu">
                        <Input accept="image/*" id="productMenu" multiple type="file" onChange={(e) => this.setState({img_url: e.target.files[0]})}/>
                        <Button variant="contained" component="span" sx={{backgroundColor: '#90caf9'}}>
                          Upload
                        </Button>
                      </label>
                    </Box>

                    <Box mt='10px' display='flex' justifyContent='center'>
                      <Button variant="contained" onClick={this.editProduct}>EDIT PRODUCT</Button>
                    </Box>
                  </Stack>
                </Box>
            </Box>
          </Modal>
        </Stack>
        <div style={{ height: 350, width: '100%' }}>
          <Confirmation isOpen={this.state.alertDelete} title="Confirmation Delete" onCancel={this.onButtonCancelDelete} onConfirm={this.onButtonConfirmDelete}/>
          <DataGrid 
            rows={this.state.dbProduct} 
            columns={columns} 
            components={{ Toolbar: GridToolbar }} 
            pageSize={3}
            rowsPerPageOptions={[3]} 
          />
        </div>
      </Container>
    );
  }
}

export default ProductList;
