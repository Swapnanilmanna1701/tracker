import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { storageUtils } from './utils/localStorage';

function App() {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = storageUtils.getUser();
    if (savedUser) {
      setUser(savedUser.username);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-violet-900 flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-transparent border-t-violet-500 border-r-purple-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-violet-500/20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? (
        <Dashboard username={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;