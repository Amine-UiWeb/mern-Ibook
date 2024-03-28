import { useState } from 'react'


const ReadMore = ({ id, text, amountOfWords = 20 }) => {

  const [isExpanded, setIsExpanded] = useState(false)


  let stringText = text.toString()
  const splittedText = stringText?.split(' ')

  const itCanOverflow = splittedText.length > amountOfWords

  const beginText = itCanOverflow
    ? splittedText.slice(0, amountOfWords - 1).join(' ') : text
  const endText = splittedText.slice(amountOfWords - 1).join(' ')
  

  const handleKeyboard = (e) => 
    (e.code === 'Space' || e.code === 'Enter') && setIsExpanded(!isExpanded)
    

  return (
    <p id={id} className='read-more d-in'>

      <span>{beginText}</span>
      
      {itCanOverflow && (
        <>
          {!isExpanded && <span>...</span>}
          
          <span 
            style={{ display: isExpanded ? 'inline' : 'none' }}
            aria-hidden={!isExpanded}
          >{endText}</span>

          <span
            role="button"
            tabIndex={0}
            className='ml-0-5 fw-5'
            style={{  cursor: 'pointer', color: 'var(--purple-200)' }}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '(show less)' : '(show more)'}
          </span>
        </>
      )}

    </p>
  )
}

export default ReadMore