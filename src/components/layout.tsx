import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

import "./layout.css"
import { SEO } from "./seo"

const Wrapper = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 0 2rem;
`

const Header = styled.header`
  padding: 1rem 0;
`

const SiteTitle = styled.h1`
  font-size: 1rem;
`

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

  return (
    <Wrapper>
      <SEO title={title} />
      <Header>
        <SiteTitle>{site.siteMetadata.title}</SiteTitle>
      </Header>
      <main>{children}</main>
      <footer></footer>
    </Wrapper>
  )
}
