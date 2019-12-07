import { MDXProvider } from '@mdx-js/react'
import React, { ReactElement, ReactNode } from 'react'
import Image from '../Image'
import * as designSystem from './designSystem'

interface DesignSystemProviderProps {
  children: ReactNode
}

const components = {
  a: designSystem.Link,
  blockquote: designSystem.Blockquote,
  inlineCode: designSystem.Code,
  h1: designSystem.H1,
  h2: designSystem.H2,
  h3: designSystem.H3,
  hr: designSystem.Hr,
  mark: designSystem.Mark,
  p: designSystem.P,
  pre: designSystem.Pre,
  table: designSystem.Table,
  // Custom Components
  Code: designSystem.Code,
  Image,
  Link: designSystem.Link,
  Note: designSystem.Note,
}

const DesignSystemProvider = ({
  children,
}: DesignSystemProviderProps): ReactElement<typeof MDXProvider> => (
  <MDXProvider components={{ ...components }}>{children}</MDXProvider>
)

export default DesignSystemProvider