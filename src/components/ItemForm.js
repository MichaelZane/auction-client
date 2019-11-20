import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Field, withFormik, } from 'formik';
import axios from 'axios';
import styled from 'styled-components';

// start of styled components
const Img = styled.img `
    width: 200px;
    height: 240px;
    display: block;
    margin: auto;
    border: 1px solid gray;
`

const FileSelect = styled.div`    
    width: 350px;
    margin-top: 4% 0;
    margin-left: 9%;
    padding: 4%;   
`
const UploadButton = styled.button`
    width: 20%;
    margin-left: -22%
    margin-right: 12%
`
const ItemBox = styled.div `
overflow: auto;
border: 1px solid grey;
width: 200px;
height: 250px;
padding: 4%;
margin-left: 22%;
border-radius: 10px;
box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.4);
`

const Label = styled.label `
    margin-top: -10%;
    // margin-left: 25%;
    width: 100%;
       
`
const Form = styled.form `

   width: 100%; 
   height: ;
   text-align: left;

  
`
// const Input = styled(Field) `
// // margin-bottom: 4%;
// // width: 100%;
// // height: 35px;
// // border: 1px solid #ccc;
// // background-color: #fff;

// `



const Button = styled.button `
    width 25%;
    height: 10%;
    margin-left: 37%;
    margin-top: 3%;
    margin-bottom: 5%;
    border-radius: 6px;
    font-size: 1.2rem;
    border: 1px solid grey;
   
`

// Start of Form Component

const ItemForm = ({ errors, touched, status }) => {
const [nameForm, setName] = useState([]);

useEffect(() => {
    status && setName(nameForm => [...nameForm, status])
}, [status]);

const [selectedFile, setSelectedFile] = useState([]);
// handles preview of image in div
const fileSelectedHandler = event => {
    setSelectedFile(URL.createObjectURL(event.target.files[0]));
}

// start of image upload

    const fileUploadHandler = () => {
            //form data being sent  
        const frmdata = new FormData();
            frmdata.append('ItemBox', selectedFile, selectedFile.name);
        axios
        .post('silent-auction-be.herokuapp.com/:sellerId/items/', frmdata, {
            onUploadProgress: progressEvent => {
            console.log('Upload Progress: ' + (progressEvent.loaded / progressEvent.total * 100) + '%')}
            })
        .then(res => {
            console.log(res);
           
            });
      
           
            }

return (
  
   
    <Form name='form' >
      <Label>
        Item Name:
        <Field className='item-name'
        border={errors.itemName && '1px solid red'} 
        name='item'
        type="text" 
        ></Field> 
        <br/>
        {touched.item && errors.item && (
        <p className='errors' >{errors.item}</p>
        )}    
        </Label>
        {/* <Label>
       <span>Start Date:</span>       
        <Field className='start-date' 
        name='start'
        type="date" 
        ></Field >        
        <br/>
        {touched.start && errors.start && (
        <p className='errors' >{errors.start}</p>
        )}
        </Label> */}
        <Label>
        <span>End Date:</span>       
        <Field className='end-date'
        name='end' 
        type="date" 
        ></Field> 
        {touched.end && errors.end && (
        <p className='errors' >{errors.end}</p>
        )}        
         </Label>
         <br/>
         {/* start bid input */}
         <Label>       
        <Field className='start-bid'
        name='bid' 
        type="number" 
        placeholder=' $ Starting Bid'
        ></Field> 
        <br/>
        
        {touched.bid && errors.bid && (
        <p className='errors' >{errors.bid}</p>
        )}
        </Label>
       
        <br/>
               
        <span className='desc-title' >Description:</span>       
        <Field as='textarea'
        className='descrip'
        name='description' 
        type="text"
       
        ></Field>                 
        <br/>
        {touched.description && errors.description && (
        <p className='errors' >{errors.description}</p>
        )}
        
{/*  paste add item so uploading all  */}
                    <UploadButton 
                    onClick={fileUploadHandler}            
                    >Add Item</UploadButton>

                    <FileSelect>
                    <input className='choose-file'      
                    type='file'          
                    onChange={fileSelectedHandler}
                    /> 
                                    

                    </FileSelect>
                    <ItemBox>
                    <Img src={selectedFile} alt='item'/>
                    </ItemBox>
    </Form>

  
    );
};
// start of validation HOC

const FormikItemForm = withFormik({
    mapPropsToValues({ item, end, bid, description }) {
        return {
            
            item: item || '',          
            end: end || '',
            bid: bid || '',
            description: description || ''

        };
    },
    validationSchema: Yup.object().shape({

        item: Yup.string().required('item name needed').min(3, 'Too short'),       
        end: Yup.string().required('end date needed'),
        bid: Yup.string().required('must put starting bid'),
        description: Yup.string().required('Item Description needed')        
    }),
    handleSubmit(values, { setStatus }) {
        axios
            .post('https://reqres.in/api/users/', values)
            .then(res => {
                setStatus(res.data);
                console.log(res); 
            })
            .catch(err => console.log(err.response));
    }
})(ItemForm);
export default FormikItemForm;
