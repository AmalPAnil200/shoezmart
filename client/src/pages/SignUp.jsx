import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [focused, setFocused] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
      );

      alert("Account created successfully! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: 'name', type: 'text', label: 'Full Name', placeholder: 'John Doe' },
    { name: 'email', type: 'email', label: 'Email Address', placeholder: 'you@example.com' },
    { name: 'password', type: 'password', label: 'Password', placeholder: '••••••••' },
    { name: 'confirmPassword', type: 'password', label: 'Confirm Password', placeholder: '••••••••' },
  ];

  return (
    <div className="min-h-screen flex">

      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 opacity-5 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="text-white text-lg font-semibold tracking-widest uppercase relative z-10">
          Shoe<span className="text-pink-500">Z</span>mart
        </div>

        {/* Hero */}
        <div className="relative z-10">
          <h1 className="text-7xl font-light text-white leading-tight mb-4">
            Your journey
            <br />
            <span className="text-pink-500 font-semibold italic">starts here.</span>
          </h1>
          <p className="text-xs tracking-widest uppercase text-zinc-500">
            Join thousands of sneaker lovers today
          </p>
        </div>

        {/* Perks */}
        <div className="relative z-10 space-y-3">
          {['Free shipping on your first order', 'Exclusive member deals', 'Easy returns & exchanges'].map((perk) => (
            <div key={perk} className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 flex-shrink-0" />
              <span className="text-xs tracking-wider text-zinc-500 uppercase">{perk}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 bg-stone-50 flex items-center justify-center p-8 relative">
        <span className="absolute top-10 right-12 text-xs tracking-widest uppercase text-zinc-300 hidden lg:block">
          Register
        </span>

        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-10 text-zinc-900 text-lg font-semibold tracking-widest uppercase">
            Shoe<span className="text-pink-500">Z</span>mart
          </div>

          {/* Heading */}
          <div className="mb-10">
            <h2 className="text-4xl font-light text-zinc-900 leading-snug">
              Create an <span className="text-pink-500 font-semibold italic">account</span>
            </h2>
            <p className="text-xs text-zinc-400 tracking-wider mt-2">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-6">
            {fields.map(({ name, type, label, placeholder }) => (
              <div key={name}>
                <label
                  className={`block text-xs tracking-widest uppercase mb-2 transition-colors duration-200 ${focused === name ? 'text-pink-500' : 'text-zinc-400'
                    }`}
                >
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={handleChange}
                  onFocus={() => setFocused(name)}
                  onBlur={() => setFocused('')}
                  required
                  className="w-full bg-transparent border-b border-zinc-200 focus:border-pink-500 outline-none py-2 text-sm text-zinc-900 placeholder-zinc-300 transition-colors duration-200"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-zinc-900 hover:bg-pink-500 text-white text-xs tracking-widest uppercase transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-200" />
            <span className="text-xs tracking-widest uppercase text-zinc-300">or</span>
            <div className="flex-1 h-px bg-zinc-200" />
          </div>

          <p className="text-center text-xs text-zinc-400 tracking-wide">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 hover:underline underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;