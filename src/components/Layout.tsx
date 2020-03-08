import { Global } from '@emotion/core'
import React, { ReactElement, ReactFragment, ReactNode } from 'react'
import Helmet from 'react-helmet'
import favicon from '../../static/images/favicon.png'
import '../fonts/fonts.css'
import { Post } from '../hooks/useBlogPostsQuery'
import useLayoutQuery from '../hooks/useLayoutQuery'
import { Atoms, H1 } from './designSystem/designSystem'
import DesignSystemProvider from './designSystem/DesignSystemProvider'
import Footer from './Footer'
import Header from './Header'
import LocationContext from './LocationContext'
import Metatags from './Metatags'
import SkipLink from './SkipLink'
import Wrapper from './Wrapper'

interface LayoutProps {
  children: ReactNode
  location: {
    pathname: string
  }

  pageContext: {
    frontmatter?: Post
  }
}

const Content = React.memo(
  ({
    children,
    pageContext: { frontmatter },
  }: Pick<LayoutProps, 'children' | 'pageContext'>): ReactElement<
    ReactFragment
  > => {
    const title = frontmatter?.title || null
    const isPost = title !== null
    const { site } = useLayoutQuery()
    return (
      <React.Fragment>
        <Helmet>
          <link rel="icon" href={favicon} />
        </Helmet>
        <Metatags
          defaultTitle={site.siteMetadata.title}
          title={title || site.siteMetadata.title}
          description={site.siteMetadata.description}
          thumbnail={
            isPost
              ? `https://daneden-og-generator.daneden.now.sh/api?title=${encodeURIComponent(
                  String(title)
                )}`
              : `${site.siteMetadata.siteUrl}/images/og.png`
          }
        />
        <SkipLink />
        <Header siteTitle={site.siteMetadata.title} />
        <Wrapper>
          {title && <H1>{title}</H1>}
          {children}
        </Wrapper>
        <Footer author={site.siteMetadata.authorName} />
      </React.Fragment>
    )
  }
)

export default function Layout({
  children,
  location,
  pageContext,
}: LayoutProps): ReactElement<typeof DesignSystemProvider> {
  return (
    <DesignSystemProvider>
      <Global
        styles={{
          ':root': {
            colorScheme: 'light dark',
            '--text-color': Atoms.colors.text,
            '--meta-color': Atoms.colors.blackAlpha,
            '--wash-color': Atoms.colors.wash,
            '--mark-color': Atoms.colors.mark,
            '--highlight-color': Atoms.colors.highlight,
            '--font-mono': Atoms.font.family.mono,

            '@media (prefers-color-scheme: dark)': {
              '--text-color': Atoms.colors.wash,
              '--meta-color': Atoms.colors.whiteAlpha,
              '--wash-color': Atoms.colors.text,
            },
          },

          '*': {
            boxSizing: 'border-box',
            margin: 0,
            padding: 0,
          },

          video: {
            display: 'block',
            marginBottom: Atoms.spacing.medium,
            maxWidth: '100%',
          },

          html: {
            backgroundColor: 'var(--wash-color)',
            color: 'var(--text-color)',
            flex: 1,
            fontFamily: Atoms.font.family.sans,
            fontSize: '125%',
            lineHeight: Atoms.baseline,
            paddingLeft: Atoms.spacing.medium,
            paddingRight: Atoms.spacing.medium,

            [`@media (max-width: ${Atoms.breakpoints.medium})`]: {
              fontSize: '100%',
            },
          },

          'ul, ol': {
            marginBottom: Atoms.spacing.medium,
            paddingLeft: Atoms.spacing.medium,
          },

          '.footnotes ol': {
            paddingLeft: 0,
          },

          '.footnotes li': {
            marginBottom: Atoms.spacing.xsmall,
            fontSize: Atoms.font.size.small,
            color: `var(--meta-color, ${Atoms.colors.meta})`,
            letterSpacing: '0.025em',
          },

          '.footnote-ref': {
            fontVariantNumeric: 'tabular-nums',
          },

          '.footnote-backref': {
            marginLeft: '0.25em',
          },

          '#gatsby-noscript': {
            display: 'none',
          },
        }}
      />
      <LocationContext.Provider value={location.pathname}>
        <Content pageContext={pageContext}>{children}</Content>
      </LocationContext.Provider>
    </DesignSystemProvider>
  )
}
