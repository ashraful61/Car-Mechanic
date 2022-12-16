import React, { useEffect, useState } from "react";

const OrderRow = ({order, handleDeleteOrder, handleStatusUpdate}) => {
    // console.log(order)
    const {serviceName, price, email, customer, phone, message, service, _id, status } = order;
    const [orderService, setOrderService] = useState({});

    useEffect(()=>{
        fetch(`https://genius-car-server-nu-bice.vercel.app/services/${service}`)
        .then(res => res.json())
        .then(data => setOrderService(data))
        .catch(error => console.log(error))
    }, [service]);


  return (
    <tr>
      <th>
        <label>
          <button onClick={()=>{handleDeleteOrder(_id)}} className="btn btn-ghost">X</button>
        </label>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="rounded w-24 h-24">
                {
                    orderService?.img &&  <img
                    src={orderService.img}
                    alt="Avatar Tailwind CSS Component"
                  />}
              
            </div>
          </div>
          <div>
            <div className="font-bold">{customer}</div>
            <div className="text-sm opacity-50">{phone}</div>
          </div>
        </div>
      </td>
      <td>
        {serviceName}
        <br />
        <span className="badge badge-ghost badge-sm">
          ${price}
        </span>
      </td>
      <td>{email}</td>
      <td>{message}</td>
      <th>
        <button onClick={()=>{handleStatusUpdate(_id)}} className="btn btn-ghost btn-xs">{status ? status: 'Pending'}</button>
      </th>
    </tr>
  );
};

export default OrderRow;
