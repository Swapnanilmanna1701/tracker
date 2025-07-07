import { ArrowRight, User } from "lucide-react";
import React, { useState } from "react";
import { storageUtils } from "../utils/localStorage";
import ParticleBackground from "./ParticleBackground";

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);

    // Simulate login delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = {
      username: username.trim(),
      loginTime: new Date().toISOString(),
    };

    storageUtils.saveUser(user);
    onLogin(username.trim());
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-violet-900 flex items-center justify-center p-4 relative overflow-hidden">
      <ParticleBackground />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-violet-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-600/5 to-purple-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="group relative">
          {/* Animated gradient border - matching the uploaded image */}
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 rounded-3xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

          <div className="relative bg-gradient-to-br from-gray-900/95 via-slate-800/90 to-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-cyan-400/30 p-10 overflow-hidden transform transition-all duration-500 hover:scale-105">
            {/* Glassmorphism overlay with cyan gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-teal-500/5 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                {/* Profile Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-teal-600/20 backdrop-blur-xl rounded-full mb-8 border border-cyan-400/40 shadow-lg shadow-cyan-500/25">
                  <User className="w-10 h-10 text-cyan-300" />
                </div>

                {/* Welcome Text */}
                <h1 className="text-4xl font-bold text-white mb-3">
                  Welcome back
                </h1>
                <p className="text-gray-400 text-lg">Sign in to your account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Username Input */}
                <div>
                  <div className="relative">
                    <input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="username@gmail.com"
                      required
                      disabled={isLoading}
                      className="w-full pl-4 pr-4 py-4 text-lg bg-gray-800/50 backdrop-blur-xl rounded-2xl text-white placeholder-gray-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-gray-800/70 hover:bg-gray-800/60 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-700/50 focus:border-cyan-400/50"
                    />
                  </div>
                </div>

                {/* Glass Effect Login Button */}
                <div className="relative group">
                  {/* Animated gradient border for button */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

                  <button
                    type="submit"
                    disabled={!username.trim() || isLoading}
                    className="relative w-full py-4 px-8 text-lg font-semibold text-white rounded-2xl overflow-hidden transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 50%, rgba(139, 92, 246, 0.15) 100%)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(6, 182, 212, 0.3)",
                      boxShadow:
                        "0 8px 32px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Glass shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                    {/* Button content */}
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                          <span>Signing In...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-white">Sign In</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
