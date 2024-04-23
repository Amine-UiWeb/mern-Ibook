import EditionsPrevItem from "./EditionsPrevItem"
import "./EditionsPrev.css"


const EditionsPreview = ({ ia, edition_key, height }) => {


  return (
    <ul className="preview-covers of-x-hidden mt-0-25" style={{ height }}>
      {
        edition_key?.map((ia, i) => (
          <EditionsPrevItem key={i} ia={ia} />
        ))
      }
    </ul>
  )
}


export default EditionsPreview