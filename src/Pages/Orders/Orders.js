import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import OrderRow from "./OrderRow";

const Orders = () => {
  const { user, logOut } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`https://genius-car-server-nu-bice.vercel.app/orders?email=${user?.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('carToken')}`
      }
    })
      .then((res) =>{
        if(res.status === 401 || res.status === 403) {
          return logOut();
        }
        return res.json();
        })
      .then((data) => setOrders(data))
      .catch((err) => console.log(err));
  }, [user?.email, logOut]);

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
    fetch(`https://genius-car-server-nu-bice.vercel.app/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('carToken')}`
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
    fetch(`https://genius-car-server-nu-bice.vercel.app/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('carToken')}`
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
