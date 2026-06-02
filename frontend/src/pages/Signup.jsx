import React from "react";
import mclaren from "../assets/mclaren.jpg";
import { useForm } from "react-hook-form";
import { api } from "../api";


function Signup() {
  const { register, 
    handleSubmit, 
    watch,
     formState: { errors } 
    } = useForm();

  const onSubmit = async (data) => {
    const newUser = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };
    try {
      const response = await api.register(newUser);
      if (response.success) {
        // save logged in user to sessionStorage with token
        sessionStorage.setItem("rq_user", JSON.stringify({
          ...response.user,
          token: response.token
        }));
        window.location.href = "/";
      } else {
        alert(response.message || "Registration failed");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full relative font-sans overflow-hidden">

      <img
        src={mclaren}
        alt="McLaren supercar"
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-bl from-black/85 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex items-center justify-between px-16 max-w-7xl mx-auto w-full">

        <div className="w-full md:w-auto md:min-w-[400px]">

          <div className="mb-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 mb-3">
              <div className="w-1.5 h-5 bg-[#94d2bd] rounded-full" />
              <span className="text-[#94d2bd] text-xs tracking-[0.35em] uppercase font-semibold">RESQUERIDE</span>
              <div className="w-1.5 h-5 bg-[#94d2bd] rounded-full" />
            </div>
            <h2 className="text-white text-2xl font-bold">Create Account</h2>
            <p className="text-white/35 text-sm mt-1">Join the world's most exclusive garage</p>
          </div>

          <div className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.8)] p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName", { required: "First Name is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                  />
                  {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                </div>
                <div className="flex-1">
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName", { required: "Last Name is required" })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                  />
                  {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email format is wrong",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" }
                  })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  {...register("phone", {
                    required: "Phone number required",
                    pattern: { value: /^[6-9]\d{9}$/, message: "Enter valid 10 digit Indian mobile number" }
                  })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                />
                {errors.phone && 
                <p className="text-red-400 text-xs mt-1">
                  {errors.phone.message}
                </p>}
              </div>

              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: "lenghth:6", minLength: { value: 6, message: "Min 6 chars" } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                  />
                  {errors.password && 
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                    </p>}
                </div>
                <div className="flex-1">
                  <label className="text-white/40 text-xs tracking-[0.2em] uppercase mb-1.5 block">Confirm</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    {...register("confirm", {
                      required: "Required",
                      validate: (val) => val === watch("password") || "Passwords dosn't match"
                    })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 outline-none focus:border-[#94d2bd] focus:bg-white/10 transition text-sm"
                  />
                  {errors.confirm && 
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirm.message}
                    </p>}
                </div>
              </div>

              <label className="flex items-start gap-3 cursor-pointer pt-1">
                <input type="checkbox" {...register("terms", { required: "You must agree" })} className="mt-0.5 accent-[#94d2bd]" />
                <span className="text-white/35 text-xs leading-relaxed">
                  I agree to the{" "}
                  <a href="#" className="text-[#94d2bd] hover:text-[#bfe8dd] transition">Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="text-[#94d2bd] hover:text-[#bfe8dd] transition">Privacy Policy</a>
                </span>
              </label>
              {errors.terms && <p className="text-red-400 text-xs">{errors.terms.message}</p>}

              <button type="submit" className="w-full bg-gradient-to-r from-[#94d2bd] to-[#7bbda8] hover:from-[#7bbda8] hover:to-[#609b8a] active:scale-[0.98] transition-all duration-200 text-white font-bold py-3 rounded-xl tracking-widest text-sm uppercase shadow-[0_4px_20px_rgba(148,210,189,0.38)]">
                Create Account
              </button>
            </form>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/20 text-[11px] tracking-widest">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <p className="text-center text-white/40 text-sm">
              Already a member?{" "}
              <a href="/login" className="text-[#94d2bd] hover:text-[#bfe8dd] transition font-semibold tracking-wide">
                Sign In
              </a>
            </p>
          </div>

          <p className="text-center text-white/15 text-xs mt-5 tracking-[0.3em] uppercase">
            Precision · Power · Prestige
          </p>
        </div>

        <div className="hidden md:flex flex-col justify-center max-w-md text-right items-end">
          <p className="text-[#94d2bd] text-xs tracking-[0.4em] uppercase font-semibold mb-4">
            Exclusive Membership —
          </p>
          <h1 className="text-white text-6xl font-black leading-[1.05] tracking-tight">
            Own the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">
              Road.
            </span>
            <br />
            Own the
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bfe8dd] to-[#94d2bd]">
              Moment.
            </span>
          </h1>
          <p className="text-white/40 text-base mt-5 leading-relaxed max-w-sm">
            Register today and step into a world where every drive is an event and every vehicle tells a story.
          </p>
          <div className="flex items-center gap-6 mt-8">
            <div className="text-right">
              <p className="text-white text-2xl font-bold">50+</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Brands</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-right">
              <p className="text-white text-2xl font-bold">24/7</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Support</p>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-right">
              <p className="text-white text-2xl font-bold">Free</p>
              <p className="text-white/30 text-xs tracking-widest uppercase">Delivery</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Signup;


