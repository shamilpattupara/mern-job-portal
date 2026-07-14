import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authServices";
import { toast } from "react-toastify";

function Register() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await register(user);

            toast.success("Registration Successful!");

            navigate("/login");

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Registration Failed"
            );
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow border-0 p-4">

                        <h2 className="text-center mb-4">
                            Create Account
                        </h2>

                        <form onSubmit={handleRegister}>

                            <div className="mb-3">
                                <label>Name</label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label>Role</label>

                                <select
                                    className="form-select"
                                    name="role"
                                    value={user.role}
                                    onChange={handleChange}
                                >
                                    <option value="user">Job Seeker</option>
                                    <option value="recruiter">Recruiter</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-100"
                            >
                                Register
                            </button>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
}

export default Register;