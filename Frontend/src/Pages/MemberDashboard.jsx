import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import AssignedTickets from '../Components/AssignedTickets';

function MemberDashboard() {
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
            <div className="header p-3">
                <h1>MEMBER DASHBOARD</h1>
            </div>
            <div className="nav-container">
                <ul className="nav nav-tabs" id="Ticket" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button
                            className="nav-link active"
                            id="Ticket-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#Ticket-tab-pane"
                            type="button"
                            role="tab"
                            aria-controls="Ticket-tab-pane"
                            aria-selected="true"
                        >
                            Assigned Tickets
                        </button>
                    </li>
                    <li className="ms-auto" role="presentation">
                        <Link className="btn btn-sm btn-danger me-2" to="/login">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
                            </svg>
                            Logout
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="Ticket-tab-pane" role="tabpanel" aria-labelledby="Ticket-tab">
                    <AssignedTickets currentUser={currentUser} />
                </div>
            </div>
        </Container>
    );
}

const Container = styled.div`
    background-color: #131324;
    min-height: 100vh;
    padding: 0;

    .header {
        background-color: #202040;
        color: white;
        text-align: center;
        padding: 1rem;
        border-bottom: 2px solid #444;
    }

    .nav-container {
        padding: 0 1rem;
    }

    .nav-tabs {
        border-bottom: none;
        margin-bottom: 1rem;
    }

    .nav-link {
        background-color: #202040;
        color: white;
        border: 1px solid #444;
        border-radius: 0.25rem 0.25rem 0 0;
        transition: background-color 0.3s ease;
    }

    .nav-link:hover {
        background-color: #444;
        color: white;
    }

    .nav-link.active {
        background-color: #1a1a3b;
        color: white;
        border-color: #444;
    }

    .btn-danger {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.375rem 0.75rem;
        font-size: 0.875rem;
    }

    svg {
        margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
        .header h1 {
            font-size: 1.5rem;
        }

        .nav-link {
            font-size: 0.875rem;
            padding: 0.5rem;
        }

        .btn-danger {
            font-size: 0.75rem;
        }
    }
`;

export default MemberDashboard;
