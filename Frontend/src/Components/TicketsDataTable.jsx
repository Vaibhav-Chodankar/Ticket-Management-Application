import React, { useState, useEffect, useRef } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function TicketDataTable(props) {
    const [tickets, settickets] = useState([]);
    const [members, setmembers] = useState([]);
    const toastOpts = {
        position: 'bottom-right',
        autoClose: 5000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    };

    useEffect(() => {
        const getAllMembers = async () => {
            try {
                const { data } = await axios.get('https://ticket-management-application-production.up.railway.app/api/member/getAllMembers');
                setmembers(data.data || []);
            } catch (error) {
                console.error("Error fetching members:", error);
            }
        };
        getAllMembers();
    }, []);

    useEffect(() => {
        const getAllTickets = async () => {
            try {
                const { data } = await axios.get('https://ticket-management-application-production.up.railway.app/api/ticket/getTicket');
                settickets(data.data || []);
            } catch (error) {
                console.error("Error fetching tickets:", error);
            }
        };
        getAllTickets();
    }, []);

    const handleDelete = async (ticketId) => {
        const confirmed = window.confirm("Are you sure you want to delete this ticket?");
        if (confirmed) {
            try {
                await axios.delete(`https://ticket-management-application-production.up.railway.app/api/ticket/${ticketId}`);
                const { data } = await axios.get('https://ticket-management-application-production.up.railway.app/api/ticket/getTicket');
                settickets(data.data || []);
                toast.success("Ticket deleted successfully!", toastOpts);
            } catch (error) {
                toast.error("Error deleting ticket, Please try again!", toastOpts);
            }
        }
    };

    const handleMemberChange = async (ticketId, memberId) => {
        try {
            await axios.put(`https://ticket-management-application-production.up.railway.app/api/ticket/${ticketId}`, { assigned: memberId });
            const { data } = await axios.get('https://ticket-management-application-production.up.railway.app/api/ticket/getTicket');
            settickets(data.data || []);
            toast.success("Member assigned successfully!", toastOpts);
        } catch (error) {
            toast.error("Error assigning member, Please try again!", toastOpts);
        }
    };

    return (
        <Container>
            <div className="table-responsive">
                <table className='table table-hover table-striped-columns table-dark'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>Department</th>
                            <th>Message</th>
                            <th>Date and Time</th>
                            <th>Assigned Member</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.length > 0 ? tickets.map((el, index) => (
                            <tr key={index}>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.companyName}</td>
                                <td>{el.department}</td>
                                <td>{el.message}</td>
                                <td>{new Date(el.createdAt).toLocaleString()}</td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={el.assigned ? el.assigned._id : ""}
                                        onChange={(e) => handleMemberChange(el._id, e.target.value)}
                                    >
                                        <option value="">--Select Member--</option>
                                        {members.map((member) => (
                                            <option key={member._id} value={member._id}>
                                                {member.username}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{el.status}</td>
                                <td>
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(el._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="9" className="text-center">No tickets found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </Container>
    );
}

const Container = styled.div`
    padding: 2rem;
    background-color: #131324;
    color: white;

    .table-responsive {
        overflow-x: auto;
    }

    .table {
        margin-top: 1rem;
    }

    .btn-danger {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    select {
        background-color: #2e2e2e;
        color: white;
        border: 1px solid #444;
        border-radius: 4px;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    option {
        background-color: #2e2e2e;
        color: white;
    }

    svg {
        margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
        .table {
            font-size: 0.8rem;
        }
    }
`;

export default TicketDataTable;
