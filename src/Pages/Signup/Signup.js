import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import loginImg from "../../assets/images/login/login.svg";
import { AuthContext } from '../../contexts/AuthProvider';


const Signup = () => {
  const { createUser } = useContext(AuthContext);
    const handleSignup = (event) => {
        event.preventDefault();
        const form = event.target;
        // const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        createUser(email, password)
        .then(result =>{
          const user = result.user;
          console.log(user)
        })
        .catch(err=>console.log(err))

    }
    return (
        <div className="hero w-full my-20">
          <div className="hero-content grid md:grid-cols-2 flex-col lg:flex-row gap-20">
            <div className="text-center lg:text-left">
              <img className="w-3/4" src={loginImg} alt="" />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 my-20 py-20">
              <h1 className="text-center text-5xl font-bold">Sign Up</h1>
              <form onSubmit={handleSignup} className="card-body">
              <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <Link href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </Link>
                  </label>
                </div>
                <div className="form-control mt-6">
                <input  className="btn btn-primary" type="submit" value="Sign Up" />
            </div>
          </form>
          <p className="text-center">Already have an account ?<Link className="text-orange-600 font-bold" to='/login'>Login</Link></p>
            </div>
          </div>
        </div>
      );
};

export default Signup;