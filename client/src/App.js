import { Routes, Route } from 'react-router-dom';
import Home from './components/home';
import Form from './components/form';
import About from './components/about';
import Nav from './components/nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


export const config = {
    baseUrl: 'http://localhost:5000'
}

const App = () => {
    return (
        <div>
            <Nav />
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/form" element={<Form />} />
                <Route exact path="/about" element={<About />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </div>
    );
}

export default App;