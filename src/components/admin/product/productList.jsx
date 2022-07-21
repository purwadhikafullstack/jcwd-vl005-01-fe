import Axios from "axios";
import React from "react";
import styled from "styled-components";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import Confirmation from "../alert/Confirmation";

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

class ProductList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        dbProductDetails:[],
        dbCategory:[],
        deleteId: '',
        editId: '',
        alertDelete: false,
        addOpen: false,
        productId:null,
        warehouseId:null,
        stock:null,
        reserved_stock:null,
        editOpen: false,
        openImage: false,
        dbWarehouse:[],
        dbProduct:[]
    }
  }

  componentDidMount() {
    this.getProductList();
    this.getCategories();
    this.getWarehouse();
    this.getProductListDetails();
  }

  getProductListDetails = () => {
    Axios.get(process.env.REACT_APP_API+'/admin/products/details')
    .then((response) => {
        this.setState({dbProductDetails: response.data})
    })
    .catch(err=> {
        console.log(err);
    })
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

    Axios.delete(process.env.REACT_APP_API+`/admin/products/stock/${this.state.deleteId}`)
    .then((response) => {
      alert('Successfully Deleted!');
      this.getProductListDetails();
      this.setState({deleteId: null});
    })
    .catch((err) =>{
      console.log(err);
      alert(err);
      this.setState({deleteId: null});
    })
  }

  getWarehouse = () => {
    Axios.get(process.env.REACT_APP_API+ '/admin/warehouse')
    .then((response) =>{
      this.setState({dbWarehouse: response.data})
    })
    .catch((err) =>{
        console.log(err);
        alert(err);
    })
  }

  btnCancel = () => {
    this.setState({addOpen: true})
    this.setState({productId: null})
    this.setState({warehouseId: null})
    this.setState({stock: null})
    this.setState({reserved_stock: null})
  }

  addStock = (e) => {
    e.preventDefault();

    Axios.post(process.env.REACT_APP_API + '/admin/products/stock', {product_id:this.state.productId , warehouse_id:this.state.warehouseId,stock:this.state.stock,reserved_stock:this.state.reserved_stock})
    .then((response) => {
        console.log("Successfully Added New Stock!");
        alert('Successfully Added New Stock!');
        this.setState({addOpen: false})
        this.setState({productId: null})
        this.setState({warehouseId: null})
        this.setState({stock: null})
        this.setState({reserved_stock: null})
        this.getProductListDetails();

    })
    .catch(err => {
        console.log(err);
        alert(err)
        this.setState({product_id: null})
        this.setState({warehouseId: null})
        this.setState({stock: null})
        this.setState({reserved_stock: null})
    })
  }

  onButtonCancelEdit = () => {
    this.setState({editId: null});
  }
  
  editStock = () => {
      
      Axios.patch(process.env.REACT_APP_API+`/admin/products/stock/${this.state.editId}`, {warehouse_id:this.state.warehouseId,stock:this.state.stock,reserved_stock:this.state.reserved_stock})
      .then((response) => {
          alert('Successfully Updated Product');
          this.setState({editOpen: false});
          this.setState({editId: null})
          this.setState({warehouseId: null})
          this.setState({stock: null})
          this.setState({reserved_stock: null})
          this.getProductListDetails();
          
      })
      .catch((err) => {
          console.log(err);
          alert(err)
          this.setState({editOpen: false});
          this.setState({editId: null})
          this.setState({warehouseId: null})
          this.setState({stock: null})
          this.setState({reserved_stock: null})
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

  printProductList = () => {
    return this.state.dbProduct.map((item, index) => {
      return(
            <MenuItem value={item.id}>{item.name}</MenuItem>
        )
    })
  }

  printWarehouseList = () => {
    return this.state.dbWarehouse.map((item, index) => {
      return(
            <MenuItem value={item.id}>{item.name_location}</MenuItem>
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
      {field : 'id', headerName: 'Stock ID', width:120},
      {field : 'name', headerName: 'Products Name', width:350},
      {field : 'price', headerName: 'Price', width:150},
      {field : 'weight_gram', headerName: 'Weight (Gram)', width:150},
      {field : 'description', headerName: 'Details', width:500},
      {field : 'categoryName', headerName: 'Category Name', width:200},
      {field : 'name_location', headerName: 'Warehouse', width: 120},
      {field : 'stock', headerName: 'Stock', width: 120},
      {field : 'reserved_stock', headerName: 'Reserved Stock', width: 150},
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
        <Box sx={{marginBottom: '10px'}}>
          <Title>Warehouse Management Product</Title>
          <Button size="small" onClick={() => this.btnCancel()}><AddIcon/>Add Stock</Button>
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
                    Insert Stock
                  </Typography>
                  <br/>
                  <Stack spacing='20px'>

                    <FormControl>
                      <InputLabel id="product-select">Product</InputLabel>
                        <Select
                          labelId="product-select"
                          id="categoryId"
                          value={this.state.productId}
                          label="Product"
                          onChange={(event) => this.handleUserInput(event)}
                          name="productId"
                          size= 'medium'
                          required
                        >
                          {this.printProductList()}
                        </Select>
                    </FormControl>
                    
                    <FormControl>
                      <InputLabel id="warehouse-select">Warehouse</InputLabel>
                          <Select
                            labelId="warehouse-select"
                            id="warehouseId"
                            value={this.state.warehouseId}
                            label="Warehouse"
                            onChange={(event) => this.handleUserInput(event)}
                            name="warehouseId"
                            size= 'medium'
                            required
                          >
                            {this.printWarehouseList()}
                          </Select>
                    </FormControl>

                   <FormControl>
                      <TextField fullWidth label="Stock" id="stock"
                        onChange ={(event) => this.handleUserInput(event)}
                        value = {this.state.stock}
                        size='medium'
                        name="stock"
                        required

                      />
                   </FormControl>

                    <FormControl>
                      <TextField fullWidth label="Reserved Stock" id="reserved_stock"
                          onChange ={(event) => this.handleUserInput(event)}
                          value = {this.state.reserved_stock}
                          size='medium'
                          name="reserved_stock"
                          required
                          
                      />
                    </FormControl>

                    <Box mt='10px' display='flex' justifyContent='center'>
                      <Button variant="contained" onClick={this.addStock}>ADD STOCK</Button>
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
                      
                      <FormControl>
                        <InputLabel id="warehouse-select">Warehouse</InputLabel>
                            <Select
                              labelId="warehouse-select"
                              id="warehouseId"
                              value={this.state.warehouseId}
                              label="Warehouse"
                              onChange={(event) => this.handleUserInput(event)}
                              name="warehouseId"
                              size= 'medium'
                              required
                            >
                              {this.printWarehouseList()}
                            </Select>
                      </FormControl>

                    <FormControl>
                        <TextField fullWidth label="Stock" id="stock"
                          onChange ={(event) => this.handleUserInput(event)}
                          value = {this.state.stock}
                          size='medium'
                          name="stock"
                          required
                          inputProps={{ inputMode: 'numeric'}}
                        />
                    </FormControl>

                      <FormControl>
                        <TextField fullWidth label="Reserved Stock" id="reserved_stock"
                            onChange ={(event) => this.handleUserInput(event)}
                            value = {this.state.reserved_stock}
                            size='medium'
                            name="reserved_stock"
                            required
                            inputProps={{ inputMode: 'numeric'}}
                        />
                      </FormControl>

                      <Box mt='10px' display='flex' justifyContent='center'>
                        <Button variant="contained" onClick={this.editStock}>ADD STOCK</Button>
                      </Box>
                  </Stack>
                </Box>
            </Box>
          </Modal>
        </Stack>
        <div style={{ height: '350px', width: '100%' }}>
          <Confirmation isOpen={this.state.alertDelete} title="Confirmation Delete" onCancel={this.onButtonCancelDelete} onConfirm={this.onButtonConfirmDelete}/>
          <DataGrid 
            rows={this.state.dbProductDetails} 
            columns={columns} 
            components={{ Toolbar: GridToolbar }} 
            pageSize={3}
            rowsPerPageOptions={[3]}
          />
        </div>
      </Container>
    );
  }
};

export default ProductList;
