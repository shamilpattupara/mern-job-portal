import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginService } from "../services/authServices";
import { AuthContext } from "../context/AuthContext";

function Login() {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await loginService(email, password);

            login(data.user, data.token);

            toast.success("Login Successful!");

            if (data.user.role === "recruiter") {
                navigate("/recruiter/dashboard");
            } else {
                navigate("/dashboard");
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Login Failed"
            );
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">

                    <div className="card shadow border-0 p-4">

                        <h2 className="text-center mb-4">
                            Login
                        </h2>

                        <form onSubmit={handleLogin}>

                            <div className="mb-3">
                                <label>Email</label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label>Password</label>

                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button className="btn btn-primary w-100">
                                Login
                            </button>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;