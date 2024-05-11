import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from "./appwrite/auth"
import { login, logout } from "./store/features/authSlice"
import { Header, Footer } from "./components"
import { Outlet } from "react-router-dom"

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData) {
        dispatch(login({userData}))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className='flex flex-col h-screen bg-imgCol'>
      <Header />
      <main className="flex-grow bg-imgCol">
        <Outlet />
      </main>
      <Footer />
    </div>
  ) : null
}

export default App;
