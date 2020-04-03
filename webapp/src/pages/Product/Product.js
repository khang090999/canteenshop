import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'
import Spinner from '../../components/Spinner/Spinner'
import UpdateButton from '../../components/Button/UpdateButton'
import ImageButton from '../../components/Button/ImageButton'
import { Navbar,FormGroup, FormControl, Alert } from 'react-bootstrap'
import ProductModal from '../Components/Modal/ProductModal'
import {storage} from '../../firebase'

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFormShow: false,
            updateData: null,
            searchValue: '',
            successNotice: '',
            successShow: false,
            errorShow: false,
            addFormShow:false,
            updateImageId:'',
            imageLoading:false
        }
        this.fetchData = this.fetchData.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleSizePerPageChange = this.handleSizePerPageChange.bind(this);
        this.activeFormatter = this.activeFormatter.bind(this);
        this.showCategoryName = this.showCategoryName.bind(this);
        this.showDataStatus = this.showDataStatus.bind(this);
        this.handleUpdateCancel = this.handleUpdateCancel.bind(this);
        this.getInitialValues = this.getInitialValues.bind(this)
        this.handleAddCancel = this.handleAddCancel.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.fileSelectHandler = this.fileSelectHandler.bind(this);

    }
    componentDidMount() {
        this.fetchData();
    }


    fetchData(page = this.props.page, sizePerPage = this.props.sizePerPage, searchValue = this.state.searchValue) {
        this.props.onFetchData(page - 1, sizePerPage, searchValue)
        this.props.onGetCategory()
    }

    handlePageChange(page, sizePerPage) {
        this.fetchData(page, sizePerPage, this.state.searchValue);
    }

    handleSizePerPageChange(sizePerPage) {
        // When changing the size per page always navigating to the first page
        this.fetchData(1, sizePerPage, this.state.searchValue);


    }
    activeFormatter(cell, row) {  
        return (
            <div>
                <ImageButton fileSelect={this.fileSelectHandler} clicked={() => this.setState({
                    updateImageId: row.id,
                })}/>
                  
                <UpdateButton clicked={() => this.setState({
                    updateFormShow: true,
                    updateData: row,
                })} />
            </div>
        )
    }
    showCategoryName(cell, row){
        return cell.name
    }
    showProductImage(cell, row){
        return <img src={cell} className="img-thumbnail"></img>
    }
    showDataStatus(cell, row){
        let txtClass="btn btn-success btn-fill btn-xs"
        let text= "available"
        if(cell==false){
            txtClass="btn btn-danger btn-fill btn-xs"
            text= "not available"
        }
        return (
            <a className={txtClass}>{text}</a>
        )
    }
    handleUpdateCancel = () => {
        this.setState({
            updateFormShow: false,
            updateData: null,
            cancelUpdate: true,
        })
    }
    handleAddCancel = () => {
        this.setState({
            addFormShow: false,
            cancelAdd: true,
        })
    }
    getInitialValues = () => {
        return {
            name: this.state.updateData ? this.state.updateData.name : '',
            id:this.state.updateData ? this.state.updateData.id : '',
            price:this.state.updateData ? this.state.updateData.price : '',
            description:this.state.updateData ? this.state.updateData.description : '',
            category:this.state.updateData ? this.state.updateData.category.id : '',
            available:this.state.updateData ? this.state.updateData.available:'' ,
        };
    }
    inputChangedHandler = (event) => {
        this.setState({ searchValue: event.target.value })
    }
    handleAddSubmit(values,categoryList) {
        this.setState({ successNotice: 'Your product has been added.', successShow: true, addFormShow: false, errorShow: true })
        this.props.onAddProduct(values,categoryList)
    }
    handleUpdateSubmit(values,categoryList) {
        this.setState({ successNotice: 'Your product has been updated.', successShow: true, updateFormShow: false, errorShow: true })
        this.props.onUpdateProduct(values,categoryList)
    }
    handleSearch() {
        this.setState({
            successShow: false,
            errorShow: false
        })
        this.fetchData(1, 20, this.state.searchValue)
    }
    fileSelectHandler=(event)=>{
        const image = event.target.files[0]
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on('state_changed',
        (snapshot)=>{
            this.setState({imageLoading:true})
        },
        (error)=>{
            console.log(error)
            this.setState({imageLoading:false})
        },
        ()=>{
            this.setState({imageLoading:false})
            storage.ref('images').child(image.name).getDownloadURL().then(url =>{
                this.props.onUpdateImage(this.state.updateImageId, url)
            })
        }
        )
    }
    render() {
        const options = {
            onPageChange: this.handlePageChange,
            onSizePerPageList: this.handleSizePerPageChange,
            page: this.props.page,
            sizePerPage: this.props.sizePerPage,
            prePage: 'Previous',
            nextPage: 'Next',
            firstPage: 'First',
            lastPage: 'Last',
            hideSizePerPage: true,
        };

        let display = (
            <div className="content">
                <div className="row">
                    <div className="col-md-4 col-lg-4">
                    <Navbar.Form pullLeft>
                            <FormGroup>
                                <FormControl   value={this.state.searchValue ? this.state.searchValue : ""} onChange={(event => this.inputChangedHandler(event))} type="text" placeholder="Type to search" />
                                <button onClick={() => this.handleSearch()} className="btn btn-simple  "><span><i className="fa fa-search"></i></span></button>
                            </FormGroup>
                            </Navbar.Form></div>
                    <div className="col-md-4 col-lg-4 pull-right">
                        <button onClick={() => this.setState({ addFormShow: true })}
                            type="button" className="btn btn-info btn-fill btn-wd pull-right" >
                            <span className="btn-label">
                            </span> <i className="fa fa-plus"></i> Add Product
                        </button>
                    </div>
                </div>

                <br />
                <BootstrapTable
                    data={this.props.data}
                    options={options}
                    fetchInfo={{ dataTotalSize: this.props.totalSize }}
                    remote
                    pagination
                    striped
                    hover
                    condensed
                >
                    <TableHeaderColumn dataField="id" isKey dataAlign="center" width="5%">Id</TableHeaderColumn>
                    <TableHeaderColumn dataField="urlImg" dataAlign="center" dataFormat={this.showProductImage} width="25%">Image</TableHeaderColumn>
                    <TableHeaderColumn dataField="name" dataAlign="center" width="15%">Product</TableHeaderColumn>
                    <TableHeaderColumn dataField="price" dataAlign="center" width="10%">Price</TableHeaderColumn>
                    <TableHeaderColumn dataField="description" dataAlign="center" width="10%">Description</TableHeaderColumn>
                    <TableHeaderColumn dataField="category" dataAlign="center" dataFormat={this.showCategoryName} width="15%">Category</TableHeaderColumn>
                    <TableHeaderColumn dataField="available" dataAlign="center" dataFormat={this.showDataStatus} width="10%">Available</TableHeaderColumn>
                    <TableHeaderColumn dataField='active' dataAlign="center" dataFormat={this.activeFormatter} width="10%">Action</TableHeaderColumn>
                </BootstrapTable>
                <ProductModal
                    show={this.state.updateFormShow}
                    hide={() => this.handleUpdateCancel()}
                    title="Update Product"
                    initialValues={this.getInitialValues()}
                    dataList={this.props.categoryData}
                    submitProduct={(values) => this.handleUpdateSubmit(values, this.props.categoryData)} />

                <ProductModal
                    show={this.state.addFormShow}
                    hide={() => this.handleAddCancel()}
                    title="Add Product"
                    dataList={this.props.categoryData}
                    initialValues={{available:true}}
                    submitProduct={(values) => this.handleAddSubmit(values,this.props.categoryData)} />

            </div>
        )
        if (this.props.loading || this.state.imageLoading) {
            display = <Spinner />
        }
        let errorMsg = null
        if ((this.props.error || this.props.categoryError)&& this.state.errorShow) {
            errorMsg = <Alert bsStyle="danger" onDismiss={() => this.setState({ errorShow: false })}>{this.props.error.message}</Alert>
        }
        let successMsg = null
        if (this.state.successShow && this.state.successNotice !== '' && !this.props.error) {
            successMsg = <Alert bsStyle="success" onDismiss={() => this.setState({ successShow: false, successNotice: '' })}>{this.state.successNotice}</Alert>
        }
        if (this.props.updateSuccess || this.props.addSuccess|| this.props.updateImageSuccess) {
            this.fetchData(1, 20, this.state.searchValue)
        }
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="header">
                                <h4>Products</h4>
                            </div>
                            {errorMsg}
                            {successMsg}
                            {display}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.product.loading,
        data: state.product.data,
        error: state.product.error,
        totalSize: state.product.total,
        page: state.product.page,
        sizePerPage: state.product.sizePerPage,
        updateSuccess: state.product.updateSuccess,
        addSuccess: state.product.addSuccess,
        categoryData: state.category.data,
        categoryError:state.category.error,
        updateImageSuccess: state.product.updateImageSuccess,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: (page, size, search) => dispatch(actions.getProduct(page, size, search)),
        onUpdateProduct: (data,categoryList) => dispatch(actions.updateProduct(data,categoryList)),
        onAddProduct: (data,categoryList) => dispatch(actions.addProduct(data,categoryList)),
        onGetCategory:() =>dispatch(actions.getAllCategories()),
        onUpdateImage: (id,url)=> dispatch(actions.updateImage(id,url))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)