import React from 'react'
import Imgix from 'react-imgix'

import mdToHTML from '../utils/mdToHTML'

class Image extends React.Component {
  render() {
    const url = (
      process.env.NODE_ENV &&
      process.env.NODE_ENV.toUpperCase() === 'DEVELOPMENT'
    )
      ? `${process.env.PUBLIC_URL || ''}/uploads/${this.props.src}`
      : `https://daneden.imgix.net/${this.props.src}`

    const img = (
      <Imgix
        customParams={{ fm: "pjpg" }}
        fit="max"
        src={url}
      />
    )

    if(this.props.caption) {
      console.log(mdToHTML(this.props.caption))
    }

    return (
      <figure
        className={[
          this.props.className,
          "ml"
        ].join(' ')}
      >
        {img}
        {this.props.caption && (
          <figcaption className="small meta">
            {mdToHTML(this.props.caption)}
          </figcaption>
        )}
      </figure>
    )
  }
}

export default Image
