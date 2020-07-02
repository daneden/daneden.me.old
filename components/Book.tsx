import { Atoms, PlainLink, Small } from "@/designSystem"
import cxs from "cxs/component"
import { FunctionComponent } from "react"
import Image from "./Image"

export interface BookData {
  author: string
  cover: string
  quote?: string
  title: string
  url: string
}

const BookContainer = cxs("div")({
  alignItems: "start",
  display: "grid",
  gridGap: Atoms.spacing.medium,
  gridTemplateColumns: `${Atoms.spacing.xxlarge} 1fr`,
})

const Book: FunctionComponent<BookData> = ({
  author,
  cover,
  quote,
  title,
  url,
}) => {
  const isExternalLink = url.startsWith("http")
  const contents = (
    <BookContainer>
      <Image
        alt={`The book cover for “${title}” by ${author}`}
        defaultSize={Atoms.spacing.xxlarge}
        margin={false}
        src={cover}
      />
      <div>
        <p>
          {title}&nbsp;
          {isExternalLink && (
            <img alt="External link icon" src="/images/outbound.svg" />
          )}
        </p>
        <p>
          <Small display="block">{author}</Small>
        </p>
        {quote && (
          <p
            style={{
              paddingTop: Atoms.spacing.xsmall,
            }}
          >
            <Small receded={false} display="block">
              <em>‘{quote}’</em>
            </Small>
          </p>
        )}
      </div>
    </BookContainer>
  )

  return <PlainLink href={url}>{contents}</PlainLink>
}

export default Book
