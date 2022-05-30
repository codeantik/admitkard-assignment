import './styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { config } from '../../App';

const Home = () => {
    const [searchEmail, setSearchEmail] = useState('');
    const [users, setUsers] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/users/${searchEmail}`);
            console.log(response.data);
            setUsers(response.data);
        }
        catch (error) {
            console.log(error);
        }
    } 

    const getUsers = async () => {
        try {
            const response = await axios.get(`${config.baseUrl}/users/all`);
            console.log(response.data);
            setUsers(response.data.users);
            toast.success('Users fetched successfully');
        }
        catch (error) {
            console.log(error);
            toast.error('Users fetch failed');
        }
    }

    useEffect(() => {
        console.log(config)
        getUsers()
    }, []);

    return (
        <div className="home">
            <div className="search-bar">
                <input 
                    type="search"   
                    placeholder='Type email' 
                    value={searchEmail}
                    onChange={(e) => setSearchEmail(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <button
                    onClick={handleSubmit}
                >
                    Search
                </button>
            </div>
            <div className="search-result">
                {
                    users.length > 0 ?
                        users.map(user => {
                            return (
                                <div className="user-info" key={user._id}>
                                    <h4>{user.name}</h4>
                                    <p>{user.email}</p>
                                    <p>{user.contactNumber}</p>
                                    <p>{user.courseLevel}</p>
                                    <p>{user.countryPreferences}</p>
                                    <p>{new Date(user.dateOfBirth).toLocaleDateString()}</p>
                                </div>
                            )
                        }
                        ) :
                        <h1>No user found!.</h1>
                }                
            </div>  
        </div>
    );
}

export default Home;