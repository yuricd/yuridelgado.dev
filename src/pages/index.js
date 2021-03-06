import React from 'react'
import Header from '../components/header/header'
import Home from '../components/home/home'
import About from '../components/about/about'
import Projects from '../components/projects/projects'
import Menu from '../components/menu/menu'
import Contact from '../components/contact/contact'
import { Helmet } from 'react-helmet'
import '../styles/default.scss'
import SEO from '../components/seo'

export default function Index() {
  return (
    <div id="personal">
      <SEO title="YD" />
      <Helmet>
        <link rel="canonical" href="http://yuridelgado.dev" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
          integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
          crossorigin="anonymous"
        />
      </Helmet>

      <div className="globalWrapper">
        <div className="topBar">
          <Header />
        </div>

        <div className="container">
          <aside>
            <Menu />
          </aside>

          <div className="content">
            <section className="page" id="home">
              <Home />
            </section>

            <section className="page" id="projects">
              <Projects />
            </section>

            <section className="page" id="about">
              <About />
            </section>

            <section className="page" id="contact">
              <Contact />
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
