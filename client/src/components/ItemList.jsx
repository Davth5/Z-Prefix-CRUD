import React from "react";

function ItemList({ items }) {
  return (
    <div>
      <h2>Your Inventory</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
