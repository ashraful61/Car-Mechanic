import React, { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";

const Checkout = () => {
  const { title, price, _id } = useLoaderData();
  const { user } = useContext(AuthContext);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = form.email.value || "Unregistered";
    const phone = form.phone.value;
    const message = form.message.value;
    const order = {
      service: _id,
      serviceName: title,
      price,
      customer: name,
      email,
      phone,
      message,
    };
    // if(phone.length > 10) {
    //     alert('Phone number should be 10 char longer')
    // }

    fetch("https://genius-car-server-nu-bice.vercel.app/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         authorization: `Bearer ${localStorage.getItem('carToken')}`
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data?.acknowledged) {
            form.reset();
            Swal.fire({
                title: 'Success!',
                text: 'Your order placed successfully',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-5">
      <form onSubmit={handlePlaceOrder}>
        <h2 className="text-4xl p-2">You are about to order: {title}</h2>
        <h4 className="text-3xl p-2 mb-4">Price: ${price}</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <input
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full "
          />
          <input
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full "
          />
          <input
            name="phone"
            type="text"
            placeholder="Your Phone"
            className="input input-bordered w-full"
            required
          />
          <input
            name="email"
            type="text"
            placeholder="Your Email"
            defaultValue={user?.email}
            className="input input-bordered w-full "
            readOnly
          />
          <textarea
            name="message"
            className="textarea input-bordered w-full"
            placeholder="Your message"
          ></textarea>
       
        </div>
        <input className="btn" type="submit" value="Place Your Order" />
      </form>
    </div>
  );
};

export default Checkout;
