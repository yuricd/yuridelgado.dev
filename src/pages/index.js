import React from 'react'
import Home from '../components/home/home'
import About from '../components/about/about'
// import Projects from '../components/Projects/about'
import '../styles/default.scss';

export default function Index() {
  return (
    <>
      <Home />
      <About />
      {/* <Projects /> */}
    </>
  )
}
