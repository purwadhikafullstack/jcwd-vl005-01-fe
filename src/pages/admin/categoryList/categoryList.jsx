import Axios from "axios";
import React from "react";
import styled from "styled-components";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { Box } from "@material-ui/core";
import RowCategory, {RowCategoryEdit} from "../product/row-category";
import Confirmation from "../../../components/admin/alert/Confirmation";
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';


const Option = styled.option``;

const Button = styled.button`
  width: 100;
  height: 40px;
  background-color: #008080;
  color: white;
  border: none;
  margin-right: 20px;
  border-radius: 5px;
  padding: 10px;
`

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
};

const CloseBtn = styled.button`
  background-color: white;
  border:none;
`

const SaveBtn = styled.button`
  width: 100;
  height: 40px;
  background-color: #008080;
  color: white;
  border: none;
`

class CategoryList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            dbCategory:[],
            dbProduct:[],
            categoryName: "",
            openNew: false,
            openEdit: false,
            deleteId:'',
            alertDelete: false,
            editId: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    
    componentDidMount(){
        this.getCategories();
        this.getProductList();
    }
    
    getProductList = () => {
        Axios.get(process.env.REACT_APP_API + "/admin/products")
        .then((response) => {
            this.setState({dbProduct: response.data})
        })
        .catch(err=> {
            console.log(err);
        })
    }
    
    getCategories = () => {
        Axios.get(process.env.REACT_APP_API+ "/admin/categories")
        .then((response) => {
            this.setState({dbCategory: response.data})
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleInputChange(event){
        this.setState({categoryName: event.target.value});
    }
    
    addCategory = () => {
        Axios.post(process.env.REACT_APP_API + "/admin/categories", {categoryName: this.state.categoryName})
        .then((response) => {
            console.log("Successfully Added New Category!");
            this.setState({openNew: false});
            alert('Successfully Added New Category!');
            this.setState({categoryName: null})
            this.getCategories();
            
        })
        .catch(err => {
            console.log(err);
            alert(err)
            this.setState({categoryName: null})
        })
    }
    
    onButtonDelete = (categoryId) => {
        this.setState({alertDelete: true});
        this.setState({deleteId: categoryId})
    }

    onButtonConfirmDelete = () => {
    this.setState({alertDelete: false});

    Axios.delete(process.env.REACT_APP_API + `/admin/categories/${this.state.deleteId}`)
    .then((response) => {
        alert('Successfully Deleted!');
        this.getCategories();
        this.setState({deleteId: null});
    })
    .catch((err) =>{
        console.log(err);
        alert(err);
        this.setState({deleteId: null});
    })
    }
    
    onButtonCancelDelete = () => {
        this.setState({alertDelete: false});
        this.setState({deleteId: null});
    }
      
    onButtonCancelEdit = () => {
        this.setState({editId: null});
    }
    
    onButtonEdit = (editId) => {
        this.setState({editId: editId});
    }
    
    printCategory = () => {
        return this.state.dbCategory.map((item, index) => {
            return(
                <Option value={index}>{item.categoryName}</Option>
            )
        })
    }

    onButtonConfirmEdit = () => {
        Axios.patch(process.env.REACT_APP_API+`/admin/categories/${this.state.editId}`, {categoryName: this.state.categoryName})
        .then((response) => {
            alert("Successfully Updated!");
            this.getCategories();
            this.setState({editId: null});
        })
        .catch((err) =>{
            console.log(err);
            alert(err);
            this.setState({editId: null});
        })
    }

    printAllCategories = () => {
        return this.state.dbCategory.map((item,index) => {
            if(item.categoryId == this.state.editId){
            return(
                <RowCategoryEdit
                item = {item}
                onCancel= {this.onButtonCancelEdit}
                handleInputChange = {this.handleInputChange}
                saveEdit = {this.onButtonConfirmEdit}
                />
            )
            }
            else{
            return(
                <RowCategory
                key ={item.categoryId}
                item = {item}
                index = {index}
                onDelete ={() => this.onButtonDelete(item.categoryId)}
                onEdit = {() => this.onButtonEdit(item.categoryId)}
                />
            )
            }
        })
    }
    render(){
        return(
            <Box display='flex' flexDirection='row' alignItems='center'>
              <Box paddingLeft='10px' paddingRight='10px'>
                <Button onClick={()=> this.setState({openNew: true})}>ADD NEW CATEGORY</Button>
                <Modal
                  open={this.state.openNew}
                  onClose={()=> this.setState({openNew: false})}
                  aria-labelledby="modal-modal-title"
                >
                  <Box sx={style}>
                    <Box position='absolute' right='5%'>
                      <CloseBtn onClick={()=> this.setState({openNew: false})}><CloseIcon sx={{color: '#008080'}}/></CloseBtn>
                    </Box>
                    <Box marginTop='30px'>
                      <Typography id="modal-modal-title" variant="h6" component="h2" color='#008080' textAlign='center' fontWeight='bold'>
                        Insert New Category
                      </Typography>
                      <br/>
                      <TextField fullWidth label="Category Name" id="categoryName"
                        value={this.state.categoryName}
                        onChange ={this.handleInputChange}
                      />
                        <br/>
                      <br/>
                      <SaveBtn onClick={this.addCategory}>ADD CATEGORY</SaveBtn>
                    </Box>
                  </Box>
                </Modal>
                <Button onClick={()=> this.setState({openEdit: true})}>EDIT CATEGORY</Button>
                <Modal
                  open={this.state.openEdit}
                  // onClose={()=> this.setState({openEdit: false})}
                  aria-labelledby="modal-modal-title"
                >
                  <Box sx={style}>
                    <Box position='absolute' right='5%'>
                      <CloseBtn onClick={()=> this.setState({openEdit: false})}><CloseIcon sx={{color: '#008080'}}/></CloseBtn>
                    </Box>
                    <Box marginTop='30px'>
                      <Typography id="modal-modal-titl e" variant="h6" component="h2" color='#008080' textAlign='center' fontWeight='bold'>
                        Edit Category
                      </Typography>
                      <TableContainer component={Paper} sx={{marginTop:'20px'}}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                              <TableRow>
                                <TableCell align="center" sx={{fontWeight: "bold"}}>No.</TableCell>
                                <TableCell align="center" sx={{fontWeight: "bold"}}>Category Name</TableCell>
                                <TableCell align="center" sx={{fontWeight: "bold"}}>Actions</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <Confirmation isOpen={this.state.alertDelete} title="Confirmation Delete" onCancel={this.onButtonCancelDelete} onConfirm={this.onButtonConfirmDelete}/>
                              {this.printAllCategories()}
                            </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Modal>
              </Box>
            </Box>
        )
    }
}

export default CategoryList;