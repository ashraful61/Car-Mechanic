import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/orders?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want delete this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteOperation(id);
      }
    });
  };

  const deleteOperation = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.deletedCount) {
          const remainingOrders = orders.filter((order) => order._id !== id);
          setOrders(remainingOrders);
          Swal.fire("Deleted!", "Your Order has been deleted.", "success");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleStatusUpdate = id => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({status:'Approved'})
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (data?.modifiedCount) {
            const remainingOrders = orders.filter(odr => odr._id !== id);
            const approving  = orders.find(odr => odr._id === id);
            approving.status = 'Approved';
            setOrders([approving,...remainingOrders]);
          Swal.fire("Approved!", "Your Order has been approved.", "success");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="p-4">
      <h2 className="text-4xl">You have {orders?.length} orders</h2>

      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Service Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRow key={order._id} order={order} handleDeleteOrder={handleDeleteOrder} handleStatusUpdate={handleStatusUpdate}></OrderRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
