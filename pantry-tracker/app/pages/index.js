"use client";
import Layout from '../layout';
import Link from 'next/link'
import React from "react";
import LandingPage from "./pages/landingPage";
import Home from "./pages/page";

function Home() {
  return (
    <div>
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</BrowserRouter>
    <ul>
      <li>
        <Link href="/">Landing Page</Link>
      </li>
      <li>
        <Link href="/home">Home</Link>
      </li>
      {/* <li>
        <Link href="/blog/hello-world">Blog Post</Link>
      </li> */}
    </ul>
    </div>
  )
}

export default Home
