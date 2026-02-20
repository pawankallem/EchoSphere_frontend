import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import bg_1 from "../assets/back_2.jpeg";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, user } = useSelector((state) => state.auth);

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.email.trim())
            newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
            newErrors.email = "Invalid email format";

        if (!form.password)
            newErrors.password = "Password is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        dispatch(login(form));

        toast.success("Logged in successfully 🎉");

        setForm({
            email: "",
            password: "",
        });

        setErrors({});
    };

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className="min-h-screen flex">

            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg_1})` }}
            />

            <div className="flex w-full md:w-1/2 items-center justify-center bg-blue-100 px-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Welcome Back 👋
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Login to continue to your account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm">{errors.password}</p>
                            )}
                        </div>

                        {/* <div className="flex justify-end text-sm">
                            <button
                                type="button"
                                className="text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div> */}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        Don’t have an account? <Link to="/register"> Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Login