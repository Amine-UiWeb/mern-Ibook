import EditionsPrevItem from "./EditionsPrevItem"
import "./EditionsPrev.css"


const EditionsPreview = ({ ia, edition_key, height }) => {


  return (
    <span className="preview-covers d-bl of-x-hidden mt-0-25" style={{ height }}>
      {
        edition_key?.map((ia, i) => (
          <EditionsPrevItem key={i} ia={ia} />
        ))
      }
    </span>
  )
}


export default EditionsPreview