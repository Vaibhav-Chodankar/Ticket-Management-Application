import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketCreation = ({ currentUser }) => {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: '',
        email: '',
        companyName: '',
        department: '',
        message: ''
    });

    const toastOpts = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            const { name, email, companyName, department, message } = values;
            const { data } = await axios.post('http://localhost:5000/api/ticket/addTicket', {
                name,
                email,
                companyName,
                department,
                message,
                createdBy: currentUser._id
            });

            if (data.status === false) {
                toast.error("Failed to raise ticket, Please try again!", toastOpts);
            }

            if (data.status === true) {
                toast.success('Issue is raised, It will take 24 hr to get resolve', toastOpts);
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    companyName: '',
                    department: '',
                    message: ''
                });
            }
        }
    };

    const formValidation = () => {
        if (values.name === "") {
            toast.error('Username is required', toastOpts);
            return false;
        } else if (values.email === '') {
            toast.error('Email is required', toastOpts);
            return false;
        } else if (values.companyName === '') {
            toast.error('Company Name is required', toastOpts);
            return false;
        } else if (values.department === '') {
            toast.error('Department is required', toastOpts);
            return false;
        } else if (values.department === '0') {
            toast.error('Department is required', toastOpts);
            return false;
        } else if (values.message === '') {
            toast.error('Message is required', toastOpts);
            return false;
        } else {
            return true;
        }
    };

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <RaiseTicket>
            <form onSubmit={(e) => handleSubmit(e)} className='row g-3'>
                <div className='col-12 text-center'>
                    <h1>Raise Ticket</h1>
                </div>
                <div className='col-md-6'>
                    <input type="text" name="name" value={values.name} onChange={(e) => handleInputChange(e)} className='form-control' placeholder='Name' />
                </div>
                <div className='col-md-6'>
                    <input type="email" name="email" value={values.email} onChange={(e) => handleInputChange(e)} className='form-control' placeholder='Email' />
                </div>
                <div className='col-md-6'>
                    <input type="text" name="companyName" value={values.companyName} onChange={(e) => handleInputChange(e)} className='form-control' placeholder='Company Name' />
                </div>
                <div className='col-md-6'>
                    <select name="department" value={values.department} onChange={(e) => handleInputChange(e)} className='form-select'>
                        <option value="0">--Select Department--</option>
                        <option value='IT'>IT</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <div className='col-12'>
                    <textarea name="message" value={values.message} onChange={(e) => handleInputChange(e)} className='form-control' rows="4" placeholder='Message'></textarea>
                </div>
                <div className='col-12 text-center'>
                    <button type='submit' className='btn btn-primary btn-lg'>Raise</button>
                </div>
            </form>
            <ToastContainer />
        </RaiseTicket>
    );
};

const RaiseTicket = styled.div`
    height: 70vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    padding: 20px;

    h1 {
        text-align: center;
        color: white;
        font-size: 1.8rem;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    form {
        background-color: #0000005f;
        border-radius: 2rem;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        button {
        background-color: #997af0;
        color: white;
        padding: 10px 20px;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: background-color 0.4s ease-in-out;
        &:hover {
            background-color: #4e0eff;
        }
    }
    }

    input, select, textarea {
        background-color: transparent;
        border: 1px solid #4e0eff;
        color: white;
        border-radius: 0.4rem;
        font-size: 1rem;
        transition: border 0.3s ease;
        &:focus {
            background-color: #0000005f;
            border-color: #997af0 !important;
            outline: none;
            color: #eaeaea;
        }

        &::placeholder {
            color: #aaa;
        }
        option{
            color: #000000;
        }
    }
`;

export default TicketCreation;
