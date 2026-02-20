import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../features/auth/authSlice";
import bg_1 from "../assets/back_2.jpeg";


const CreateAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, error } = useSelector(state => state.auth)

    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        password: "",
        dob: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};

        if (!form.fullname.trim()) newErrors.fullname = "Full name is required";

        if (!form.username.trim())
            newErrors.username = "Username is required";
        else if (form.username.length < 3)
            newErrors.username = "Minimum 3 characters required";

        if (!form.email.trim())
            newErrors.email = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(form.email))
            newErrors.email = "Invalid email format";

        if (!form.password)
            newErrors.password = "Password is required";
        else if (form.password.length < 6)
            newErrors.password = "Minimum 6 characters";

        if (!form.dob)
            newErrors.dob = "Date of birth is required";

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        dispatch(register(form)).then((res) => {
            if (res.meta.requestStatus === "fulfilled") {
                navigate("/login");
            }
        });

        toast.success("User account created 🎉");

        setForm({
            fullname: "",
            username: "",
            email: "",
            password: "",
            dob: "",
        });

        setErrors({});
    };

    return (
        <div className="min-h-screen flex">

            <div
                className="hidden md:flex w-1/2 bg-cover bg-center"
                style={{ backgroundImage: `url(${bg_1})` }}
            />

            <div className="flex w-full md:w-1/2 items-center justify-center bg-blue-100 px-6">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        Create Account
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Join the community and start sharing 🚀
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={form.fullname}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.fullname && (
                                <p className="text-red-500 text-sm">{errors.fullname}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.username && (
                                <p className="text-red-500 text-sm">{errors.username}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
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

                        <div>
                            <input
                                type="date"
                                name="dob"
                                value={form.dob}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            {errors.dob && (
                                <p className="text-red-500 text-sm">{errors.dob}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="text-sm text-gray-500 text-center mt-6">
                        Already have an account? <Link to="/login"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default CreateAccount;