import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';

const AssignedTickets = ({ currentUser }) => {
    const [show, setShow] = useState(false);
    const [raise, setRaise] = useState(false);
    const [assignedTickets, setAssignedTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [status, setStatus] = useState('');
    const [timeRequired, setTimeRequired] = useState('');
    const [raiseMessage, setRaiseMessage] = useState('');

    const toastOpts = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        const getAssignedTickets = async () => {
            const { data } = await axios.get(`https://ticket-management-application-production.up.railway.app/api/member/getAssignedTicket/${currentUser._id}`);
            setAssignedTickets(data.data || []);
        };
        getAssignedTickets();
    }, [currentUser]);

    const handleRaiseShow = () => setRaise(true);
    const handleRaiseClose = () => setRaise(false);
    const handleClose = () => setShow(false);
    const handleShow = (ticket) => {
        setSelectedTicket(ticket);
        setStatus(ticket.status);
        setShow(true);
    };

    const handleDelete = async (ticketId) => {
        const confirmed = window.confirm("Are you sure you want to delete this ticket?");
        if (confirmed) {
            try {
                await axios.delete(`https://ticket-management-application-production.up.railway.app/api/ticket/${ticketId}`);
                const { data } = await axios.get(`https://ticket-management-application-production.up.railway.app/api/member/getAssignedTicket/${currentUser._id}`);
                setAssignedTickets(data.data || []);
                toast.success("Ticket deleted successfully!", toastOpts);
            } catch (error) {
                toast.error("Error deleting ticket, Please try again!", toastOpts);
            }
        }
    };

    const handleStatusChange = async () => {
        try {
            await axios.put(`https://ticket-management-application-production.up.railway.app/api/ticket/${selectedTicket._id}`, { status, timeRequired });
            const { data } = await axios.get(`https://ticket-management-application-production.up.railway.app/api/member/getAssignedTicket/${currentUser._id}`);
            setAssignedTickets(data.data || []);
            toast.success("Ticket updated successfully!", toastOpts);
            setTimeRequired('');
            handleClose();
        } catch (error) {
            toast.error("Error updating ticket, Please try again!", toastOpts);
            setTimeRequired('');
        }
    };

    const handleRaiseIssue = async () => {
        if (raiseMessage === "") {
            toast.error("Message cannot be empty!", toastOpts);
        } else {
            toast.success("Issue raised successfully!", toastOpts);
            setRaiseMessage('')
            handleRaiseClose();
        }

    };

    return (
        <>
            <Container isModalOpen={show || raise}>
                <div className="wrapper p-4">
                    <table className='table table-hover table-striped-columns table-dark'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>Department</th>
                                <th>Message</th>
                                <th>Date and Time</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assignedTickets.length > 0 ? (
                                assignedTickets.map((el, index) => (
                                    <tr key={index}>
                                        <td>{el.name}</td>
                                        <td>{el.email}</td>
                                        <td>{el.companyName}</td>
                                        <td>{el.department}</td>
                                        <td>{el.message}</td>
                                        <td>{new Date(el.createdAt).toLocaleString()}</td>
                                        <td>{el.status}</td>
                                        <td className='d-flex justify-content-start align-item-center'>
                                            <button className='btn btn-sm btn-info ms-1 me-1' onClick={() => handleRaiseShow(el)}>Raise</button>
                                            <button className='btn btn-sm btn-primary ms-1 me-1' onClick={() => handleShow(el)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen p-0 m-0" viewBox="0 0 16 16">
                                                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                                                </svg>
                                            </button>
                                            <button className='btn btn-sm btn-danger ms-1 me-1' onClick={() => handleDelete(el._id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash p-0 m-0" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center">No assigned tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <ToastContainer />
            </Container>

            {show && (
                <ModalOverlay>
                    <Modal>
                        <div className="modal-header">
                            <h5 className="modal-title">Change Status</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Status</label>
                                    <select className="form-control" value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                    <div className={`form-group ${status === 'closed' ? 'd-none' : ''}`}>
                                        <label>Time Required</label>
                                        <input type="text" className="form-control" placeholder="Time required" value={timeRequired} onChange={(e) => setTimeRequired(e.target.value)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm me-1" onClick={handleClose}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm me-1" onClick={handleStatusChange}>Save changes</button>
                        </div>
                    </Modal>
                </ModalOverlay>
            )}

            {raise && (
                <ModalOverlay>
                    <Modal>
                        <div className="modal-header">
                            <h5 className="modal-title">Raise Issue to Manager</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Message</label>
                                    <input type="text" className="form-control" placeholder="Enter your message" value={raiseMessage} onChange={(e) => setRaiseMessage(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm me-1" onClick={handleRaiseClose}>Close</button>
                            <button type="button" className="btn btn-primary btn-sm me-1" onClick={handleRaiseIssue}>Raise Issue</button>
                        </div>
                    </Modal>
                </ModalOverlay>
            )}
        </>
    );
};

const Container = styled.div`
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #131324;
    color: white;
    ${(props) => props.isModalOpen && `
        filter: blur(8px);
        pointer-events: none;
    `}
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    background-color: #1f1f2e;
    color: white;
    border-radius: 8px;
    width: 400px;
    padding: 20px;

    .modal-header, .modal-footer {
        border-bottom: 1px solid #444;
        padding-bottom: 10px;
    }

    .modal-footer {
        border-top: none;
        padding-top: 10px;
    }

    .form-group {
        margin-bottom: 15px;
    }

    .form-control {
        background-color: #2e2e3e;
        color: white;
        border: 1px solid #444;
        &::placeholder{
            color: #a1a1a1;
        }
    }

    .form-control:focus {
        background-color: #3e3e4e;
        color: white;
    }
`;

export default AssignedTickets;
