import React from "react";

function OrderingSelector({orderVideos}) {
  const handleChange = (event) => {
    orderVideos(event.target.value);
  };

  return (
    <div>
      <p>Sort by</p>
      <select onChange={handleChange}>
        <option>descending</option>
        <option>ascending</option>
      </select>
    </div>
  )
}

export default OrderingSelector;