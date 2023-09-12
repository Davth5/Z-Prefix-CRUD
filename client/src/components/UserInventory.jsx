// import React, { useEffect, useState } from "react";

// const UserInventory = () => {
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     // Fetch the items from the backend and set them in the state
//     const fetchItems = async () => {
//       try {
//         const response = await fetch(`/api/items/:userId`); // adjust this endpoint; use actual userId
//         const data = await response.json();
//         setItems(data);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//       }
//     };

//     fetchItems();
//   }, []);

//   return (
//     <div>
//       <h2>Your Inventory</h2>
//       <ul>
//         {items.map((item) => (
//           <li key={item.id}>
//             {item.name} - {item.description} - {item.quantity}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserInventory;
