import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import NavBar from './components/NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <NavBar />
            <div className="container">
                <Routes>
                    {/* Route to list all books */}
                    <Route path="/" element={<BookList />} />
                    
                    {/* Route to add a new book */}
                    <Route path="/add-book" element={<AddBook />} />
                    
                    {/* Route to edit an existing book */}
                    <Route path="/edit-book/:id" element={<EditBook />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
