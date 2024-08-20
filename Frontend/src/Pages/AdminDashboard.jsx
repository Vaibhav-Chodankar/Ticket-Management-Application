import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TicketDataTable from '../Components/TicketsDataTable';
import { Link, useNavigate } from 'react-router-dom';
import ClosedTickets from '../Components/ClosedTickets';

function AdminDashboard(props) {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const checkUser = async () => {
            const user = await JSON.parse(localStorage.getItem('user'));
            if (!user) {
                navigate('/login');
            } else {
                setCurrentUser(user);
            }
        }
        checkUser();
    }, []);

    return (
        <Container>
            <h1 className='p-2'>ADMIN DASHBOARD</h1>
            <ul className="nav nav-tabs" id="Ticket" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="Ticket-tab" data-bs-toggle="tab" data-bs-target="#Ticket-tab-pane" type="button" role="tab" aria-controls="Ticket-tab-pane" aria-selected="true">Tickets</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="ticket-status-tab" data-bs-toggle="tab" data-bs-target="#ticket-status-tab-pane" type="button" role="tab" aria-controls="ticket-status-tab-pane" aria-selected="false">Closed Tickets</button>
                </li>
                <li className="ms-auto" role="presentation">
                    <Link className='btn btn-sm btn-danger me-2' to='/login'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                            <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                        </svg>
                        <span className='pt-2 ms-1 mt-1'>Logout</span>
                    </Link>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="Ticket-tab-pane" role="tabpanel" aria-labelledby="Ticket-tab" tabIndex="0">
                    <TicketDataTable currentUser={currentUser} />
                </div>

                <div className="tab-pane fade" id="ticket-status-tab-pane" role="tabpanel" aria-labelledby="ticket-status-tab" tabIndex="0">
                    <ClosedTickets />
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: #131324;
    height: 100vh;
    h1{
        color: white;
        text-align: center;
    }
    .nav-link{
        background-color: black;
        color: white;
    }
    .nav-link.active{
        background-color: #4e0eff;
        color: white;
    }
    .tab-pane{
        padding: 20px;
    }
`;

export default AdminDashboard;
