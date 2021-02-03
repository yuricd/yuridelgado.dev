import React from 'react'
import Home from '../components/home/home'
import About from '../components/about/about'
import Projects from '../components/projects/projects'
import { Helmet } from 'react-helmet'
import '../styles/default.scss';

export default function Index() {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous" />
      </Helmet>
      
      <Home />
      <About />
      <Projects />
    </>
  )
}
