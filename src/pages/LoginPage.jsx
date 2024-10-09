import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginPage() {
  const [forgotPassword, setForgotPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForgotPass = () => setForgotPassword(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (forgotPassword) {
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent!");
      } catch (err) {
        setError("Failed to send password reset email. Please try again.");
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
        navigate("/dashboard");
      } catch (err) {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="grid lg:grid-cols-[40%_60%] grid-cols-[100%] h-screen roboto-bold">
      <div className="text-[#6f6b71]">
        <h2 className="w-max py-[10px] px-[40px] text-[30px]">iHelp</h2>
        <div className="flex flex-col items-center justify-center lg:mt-[15%] mt-[35%]">
          <h1 className="text-[36px] mb-[6%]">
            {forgotPassword ? "Forgot Password" : "Sign in"}
          </h1>
          {error && <p className="text-red-500">{error}</p>}
          <form
            className="flex flex-col lg:w-[55%] w-[85%] relative z-10"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email" className="flex flex-col gap-1 mb-[5%]">
              Email:
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-[5px] border-[1px] border-[#7b777d] rounded-[5px]"
              />
            </label>
            {!forgotPassword && (
              <label
                htmlFor="password"
                className="flex flex-col gap-1 mb-[12%]"
              >
                Password:
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-[5px] border-[1px] border-[#7b777d] rounded-[5px]"
                />
              </label>
            )}
            <input
              type="submit"
              value={forgotPassword ? "Send Request" : "Login"}
              className="py-[5px] text-white bg-[#1985A1] rounded-[5px] cursor-pointer text-[16px] roboto-regular mb-[5%]"
            />
          </form>
          {!forgotPassword && (
            <p
              className="roboto-regular cursor-pointer"
              onClick={handleForgotPass}
            >
              Forgot password
            </p>
          )}
        </div>
      </div>
      <div className="bg-[#289dbc] text-white relative lg:block hidden">
        <div className="w-[100%] h-[85%] flex items-center justify-center">
          <div className="w-[40%] flex flex-col items-center justify-center relative z-10 text-center">
            <p className="text-[36px] roboto-medium">Turn your ideas</p>
            <p className="text-[36px] roboto-medium mb-[3%]">into reality</p>
            <p className="text-[24px] roboto-light">
              Creating a stronger, more compassionate community
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 w-[50%] h-[50%] overflow-hidden rounded-tr-[100%] rounded-bl-none rounded-br-none rounded-tl-none">
          <img
            src="https:shorturl.at/uL9TJ"
            alt="Volunteers helping out with donations"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute top-5 right-2 grid grid-cols-[50%_50%]">
          <div>
            <div className="hexagon"></div>
            <div className="hexagon mt-[-8px]"></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="hexagon col-span-2 ml-[-25px]"></div>
          </div>
        </div>

        <div className="flex absolute top-0 w-[40%] h-[40%]">
          <div className="bg-[#1985A1] w-[25%] h-[100%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[75%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[50%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[25%]"></div>
        </div>

        <div className="flex absolute bottom-0 right-0 w-[40%] h-[40%] scale-[-1]">
          <div className="bg-[#1985A1] w-[25%] h-[100%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[75%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[50%]"></div>
          <div className="bg-[#1985A1] w-[25%] h-[25%]"></div>
        </div>
      </div>

      <style jsx>{`
        .hexagon {
          width: 150px;
          height: 150px;
          background-color: #1985a1;
          clip-path: polygon(
            25% 5%,
            75% 5%,
            100% 50%,
            75% 95%,
            25% 95%,
            0% 50%
          );
        }
      `}</style>
    </div>
  );
}
