import React from 'react'
import { useEffect } from 'react'
import gsap from 'gsap'

const Error404 = () => {
  useEffect(() => {
    gsap.to('#error404', { opacity: 1, duration: 0.4 })
  }, [])

  return (
    <div
      id="error404"
      style={{
        opacity: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: '100vh',
        textAlign: 'center',
        margin: '0 auto'
      }}
    >
      <h1>Ooops... The page you're trying to reach seems to be vanished.</h1>
      <h2>
        Maybe you want to see more about me <a href="/">here</a> ou check my
        blog posts <a href="/blog">here</a>.
      </h2>
    </div>
  )
}
export default Error404
