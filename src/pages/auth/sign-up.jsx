import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../api";

export function SignUp() {
  const [formData, setFormData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "", // 🔹 Added password confirmation
    Type: 0, // Default user type
    Image: null, // Profile image file
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, Image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // 🔹 Basic validation
    if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Password || !formData.ConfirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.Password !== formData.ConfirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Prepare FormData for API request
    const formDataToSend = new FormData();
    formDataToSend.append("FirstName", formData.FirstName);
    formDataToSend.append("MiddleName", formData.MiddleName);
    formDataToSend.append("LastName", formData.LastName);
    formDataToSend.append("Email", formData.Email);
    formDataToSend.append("Password", formData.Password);
    formDataToSend.append("Type", formData.Type);

    if (formData.Image) {
      formDataToSend.append("Image", formData.Image);
    }

    try {
      await registerUser(formDataToSend);
      navigate("/auth/sign-in");
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <section className="m-8 flex">
      <div className="w-2/5 h-full hidden lg:block">
        <img src="/img/pattern.png" className="h-full w-full object-cover rounded-3xl" alt="Background pattern" />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal">Enter your details to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2" onSubmit={handleSubmit}>
          <div className="mb-1 flex flex-col gap-6">
            {[
              { name: "FirstName", label: "First Name" },
              { name: "MiddleName", label: "Middle Name" },
              { name: "LastName", label: "Last Name" },
              { name: "Email", label: "Email Address", type: "email" },
              { name: "Password", label: "Password", type: "password" },
              { name: "ConfirmPassword", label: "Confirm Password", type: "password" }
            ].map((field, index) => (
              <Input
                key={index}
                size="lg"
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                value={formData[field.name]}
                onChange={handleChange}
                className="border-t-blue-gray-200 focus:border-t-gray-900"
                required
              />
            ))}

            {/* File Upload */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 rounded-lg"
            />
          </div>

          {error && <Typography variant="small" color="red" className="mt-2">{error}</Typography>}
          <Button className="mt-6" fullWidth type="submit">
            Register Now
          </Button>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-gray-900 ml-1">Sign in</Link>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
