import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import axios from 'axios';

function ClosedTickets(props) {
    const [closedTickets, setClosedTickets] = useState([]);

    useEffect(() => {
        const getClosedTickets = async () => {
            const { data } = await axios.get('https://ticket-management-application-production.up.railway.app/api/ticket/getClosedTicket')
            setClosedTickets(data.data || []);
        }
        getClosedTickets();
    }, []);

    return (
        <Container>
            <div className="wrapper container-fluid py-4">
                <div className="table-responsive">
                    <table className="table table-hover table-striped-columns table-dark">
                        <thead className="thead-dark">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Company Name</th>
                                <th>Department</th>
                                <th>Message</th>
                                <th>Created Date and Time</th>
                                <th>Closed Date and Time</th>
                                <th>Assigned to</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {closedTickets.length > 0 ? (
                                closedTickets.map((el, index) => (
                                    <tr key={index}>
                                        <td>{el.name}</td>
                                        <td>{el.email}</td>
                                        <td>{el.companyName}</td>
                                        <td>{el.department}</td>
                                        <td>{el.message}</td>
                                        <td>{new Date(el.createdAt).toLocaleString()}</td>
                                        <td>{new Date(el.updatedAt).toLocaleString()}</td>
                                        <td>{el.assigned.username}</td>
                                        <td className="text-success">{el.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">No closed tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #131324;
    color: white;

    .wrapper {
        max-width: 1200px;
    }

    h2 {
        color: #ffffff;
    }

    .table {
        margin-top: 1rem;
    }

    .thead-dark {
        background-color: #2e2e2e;
    }

    @media (max-width: 768px) {
        .table {
            font-size: 0.8rem;
        }
    }
`;

export default ClosedTickets;
