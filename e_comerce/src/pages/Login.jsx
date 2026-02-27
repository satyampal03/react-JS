import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

 const Login = () => {
  return <>
      
        <Header />
    
    <div className="flex h-screen items-center justify-center bg-gray-100">
  <div className="text-center">
    <h1 className="text-6xl font-bold text-indigo-600">404</h1>
    <p className="text-2xl font-medium text-gray-800 mt-4">Page Not Found</p>
    <a href="/" className="mt-6 inline-block px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition">
      Go Home
    </a>
  </div>
</div>

<Footer />
  


  </>
     
  
}

export default Login;