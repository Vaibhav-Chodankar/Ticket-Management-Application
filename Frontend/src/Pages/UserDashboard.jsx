import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import TicketCreation from '../Components/TicketCreation';
import TicketStatus from '../Components/TicketStatus';
import { useNavigate, Link } from 'react-router-dom';

function UserDashboard(props) {
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
            <Header>
                <h1>USER DASHBOARD</h1>
                <Link className='btn btn-sm btn-danger logout' to='/login'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                    </svg> Logout
                </Link>
            </Header>
            <Nav>
                <ul className="nav nav-tabs" id="Ticket" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="Ticket-tab" data-bs-toggle="tab" data-bs-target="#Ticket-tab-pane" type="button" role="tab" aria-controls="Ticket-tab-pane" aria-selected="true">Raise Ticket</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="ticket-status-tab" data-bs-toggle="tab" data-bs-target="#ticket-status-tab-pane" type="button" role="tab" aria-controls="ticket-status-tab-pane" aria-selected="false">Ticket Status</button>
                    </li>
                </ul>
            </Nav>
            <Content>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="Ticket-tab-pane" role="tabpanel" aria-labelledby="Ticket-tab" tabIndex="0">
                        <TicketCreation currentUser={currentUser} />
                    </div>
                    <div className="tab-pane fade" id="ticket-status-tab-pane" role="tabpanel" aria-labelledby="ticket-status-tab" tabIndex="0">
                        <TicketStatus currentUser={currentUser} />
                    </div>
                </div>
            </Content>
        </Container>
    );
}

const Container = styled.div`
    background-color: #131324;
    min-height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h1 {
        color: white;
        margin: 0;
    }

    .logout {
        display: flex;
        align-items: center;
        gap: 5px;
        background-color: #d9534f;
        border: none;
        color: white;
        padding: 5px 10px;
        border-radius: 5px;
        text-decoration: none;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        
        .logout {
            margin-top: 10px;
        }
    }
`;

const Nav = styled.nav`
    width: 100%;

    .nav-tabs {
        display: flex;
        justify-content: center;
    }

    .nav-item {
        margin-bottom: 0;
    }

    .nav-link {
        background-color: #343a40;
        color: white;
        border-radius: 5px 5px 0 0;
        padding: 10px 20px;
        transition: background-color 0.3s ease;
    }

    .nav-link.active {
        background-color: #007bff;
        color: white;
    }

    @media (max-width: 768px) {
        .nav-tabs {
            flex-direction: column;
        }

        .nav-link {
            margin-bottom: 5px;
            text-align: center;
        }
    }
`;

const Content = styled.div`
    width: 100%;
    border-radius: 0 0 10px 10px;
    padding: 20px;
    color: white;

    .tab-content {
        display: flex;
        justify-content: center;
    }

    @media (max-width: 768px) {
        padding: 10px;

        .tab-content {
            flex-direction: column;
        }
    }
`;

export default UserDashboard;
