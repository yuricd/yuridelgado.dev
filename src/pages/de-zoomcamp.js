import React, { useEffect } from 'react'
import SEO from '../components/seo'

const DEZoomcamp = () => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
  }, [])

  return (
    <>
      <SEO title="DE Zoomcamp Project" URI="/de-zoomcamp" />
      <iframe
        title="Real Estate Project"
        width="100%"
        src="https://datastudio.google.com/embed/reporting/0bd70c12-65e6-4d48-843d-d19aa88ba87b/page/SdzCD"
        frameborder="0"
        style={{ height: '100vh', border: 0 }}
        allowfullscreen
      />
    </>
  )
}
export default DEZoomcamp
