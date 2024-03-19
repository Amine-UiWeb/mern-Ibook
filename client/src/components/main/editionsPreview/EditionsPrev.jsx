import EditionsPrevItem from "./EditionsPrevItem"
import "./EditionsPrev.css"


const EditionsPreview = ({ ia, height }) => {

  return (
    <span className="preview-covers d-bl of-hidden mt-0-25" style={{ height }}>
      {
        ia?.map((iaKey, i) => (
          <EditionsPrevItem key={i} iaKey={iaKey} />
        ))
      }
    </span>
  )
}


export default EditionsPreview