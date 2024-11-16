import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Book List</Link>
                </li>
                <li>
                    <Link to="/add-book">Add Book</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
