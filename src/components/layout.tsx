import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import { SEO } from "./seo"

interface LayoutProps {
  title: string
}

export const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [bold, normal] = site.siteMetadata.title.split(" ")

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-gray-100">
      <SEO title={title} />
      <header className="py-2">
        <h1 className="text-2xl">
          <span className="font-semibold">{bold}</span> {normal}
        </h1>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  )
}
