import { useForm } from 'react-hook-form';

export default function Reactform() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    alert("Form submitted");
    reset();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">Register Now</h2>

        <label className="block mb-1 font-medium text-white">Name:</label>
        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#94d2bd] bg-gray-700 text-white border-gray-600 mb-1"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <p className="text-red-500 text-sm mt-1 mb-3">{errors.name.message}</p>}

        <button
          type="submit"
          className="w-full mt-4 bg-[#94d2bd] hover:bg-[#7bbda8] text-white font-bold py-3 rounded-lg transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}


