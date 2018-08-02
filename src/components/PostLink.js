import React from "react"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link className="plainlink" to={post.fields.slug}>
      <span className="b m0">{post.frontmatter.title}</span>
      <span className="b h4 em meta">{post.frontmatter.date}</span>
    </Link>
  </div>
)

export default PostLink
