import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Register(props) {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        username: '',
        email: '',
        role: 'user',
        password: '',
        confirmPassword: ''
    });

    const toastOpts = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password, role } = values;
            const { data } = await axios.post('https://ticket-management-application-production.up.railway.app/api/auth/register', {
                email,
                username,
                role,
                password
            });

            if (data.status === false) {
                toast.error(data.message, toastOpts);
            }

            if (data.status === true) {
                localStorage.setItem('user', JSON.stringify(data.user));
                if (data.user.role === 'user') {
                    navigate('/user');
                } else if (data.user.role === 'member') {
                    navigate('/member')
                } else if (data.user.role === 'admin') {
                    navigate('/admin')
                }
            }
        }
    }

    const handleValidation = () => {
        const { username, email, password, confirmPassword } = values;
        if (password !== confirmPassword) {
            toast.error('Password and confirm password should be same', toastOpts);
            return false
        } else if (username.length < 3) {
            toast.error('Username should be greater then 3 characters', toastOpts);
            return false
        } else if (password.length < 8) {
            toast.error('Password should be greater then 8', toastOpts);
            return false
        }
        return true;
    }

    const handleInputChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={e => handleSubmit(e)}>
                    <div className="brand">
                        <h1>Register</h1>
                    </div>
                    <input type="text" name="username" onChange={e => handleInputChange(e)} placeholder='Username' autoComplete='off' required />
                    <input type="email" name="email" onChange={e => handleInputChange(e)} placeholder='Email' autoComplete='off' required />
                    <select name="role" onChange={handleInputChange}>
                        <option value="user">User</option>
                        <option value="member">Member</option>
                        <option value="admin">Admin</option>
                    </select>
                    <input type="password" name="password" onChange={e => handleInputChange(e)} placeholder='Password' autoComplete='off' required />
                    <input type="password" name="confirmPassword" onChange={e => handleInputChange(e)} placeholder='Confirm Password' autoComplete='off' required />
                    <button type='submit'>Create User</button>
                    <span>Already have an account ? <Link to='/login'>Login</Link> </span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap:1rem;
align-items: center;
 background-color: #131324;
 .brand{
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
 }
 img{
    height: 5rem;
    border-radius: 25%;
 }
 h1{
    color: white;
    text-transform: uppercase;
 }
 form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 2rem 5rem;
    input,select{
        background-color: transparent;
        padding: 1rem;
        border: 0.1rem solid #4e0eff;
        color: white;
        border-radius: 0.4rem;
        width: 100%;
        font-size: 1rem;
        &:focus{
            border: 0.1rem solid #997af0;
            outline: none;
        }
        option{
            background-color: #030306;
            color: white;
            padding: 1rem;
        }
    }
    button{
        background-color: #997af0;
        color:white;
        padding: 1rem 2rem;
        font-weight: bold;
        cursor: pointer;
        border-radius: 0.4rem;
        font-size: 1rem;
        text-transform: uppercase;
        transition: 0.4s ease-in-out;
        &:hover{
            background-color: #4e0eff;
        }
    }
 }
 span{
    color: white;
    text-transform: uppercase;
    a{
        font-weight: bold;
        text-decoration: none;
        color: #4e0eff;
    }
 }
`;

export default Register;