import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';

const TicketStatus = ({ currentUser }) => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const getTickets = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/ticket/getTicket/${currentUser._id}`);
            setTickets(data.data);
            console.log(data.data);
        }
        getTickets();
    }, [currentUser]);

    return (
        <Container>
            <div className="wrapper">
                {tickets.length > 0 ? (
                    <table className='table table-hover table-dark table-responsive'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>Department</th>
                                <th>Message</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.map((el, index) => (
                                <tr key={index}>
                                    <td>{el.name}</td>
                                    <td>{el.email}</td>
                                    <td>{el.companyName}</td>
                                    <td>{el.department}</td>
                                    <td>{el.message}</td>
                                    <td>
                                        <span className={`badge ${el.status === 'closed' ? 'bg-success' : 'bg-secondary'}`}>
                                            {el.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">No tickets found.</p>
                )}
            </div>
        </Container>
    );
}

const Container = styled.div`
    /* min-height: 100vh; */
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    color: white;
    padding: 20px;

    .wrapper {
        width: 100%;
        max-width: 1200px;
        background-color: #1e1e2f;
        border-radius: 10px;
        padding: 20px;
    }

    h2 {
        color: #fff;
    }

    .table {
        margin-bottom: 0;
    }

    .badge {
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .table-responsive {
            overflow-x: auto;
        }
    }
`;

export default TicketStatus;
