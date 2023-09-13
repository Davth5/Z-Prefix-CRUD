import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddItem from "./AddItem";

function UserInventory({ userId }) {
    const [items, setItems] = useState([]);
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/items/${userId}`);
                setItems(response.data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        const fetchUserInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/users/${userId}`);
                setUserInfo(response.data);
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchItems();
        fetchUserInfo();
    }, [userId]);

    const handleItemAdded = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    };

    return (
        <div>
            {userInfo && (
                <div>
                    <h2>Welcome, {userInfo.userName}!</h2>
                    <p>User ID: {userInfo.id}</p>
                </div>
            )}

            <AddItem userId={userId} onItemAdded={handleItemAdded} />

            <div>
                <h3>Your Inventory:</h3>
                {items.map(item => (
                    <div key={item.id}>
                        <Link to={`/item/${item.id}`}>{item.itemName}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserInventory;
