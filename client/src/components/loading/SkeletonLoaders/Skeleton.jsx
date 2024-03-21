import "./Skeleton.css"


const Skeleton = ({ cls }) => <div className={'skeleton ' + cls}></div>


export const TitleSkeleton = () => <Skeleton cls='skeleton-title center' />
export const SubTitleSkeleton = () => <Skeleton cls='skeleton-subtitle center' />
export const HeaderSkeleton = () => <Skeleton cls='skeleton-header' />


export const TextSkeleton = () => <Skeleton cls='skeleton-text' />
export const OneLineSkeleton = () => <Skeleton cls='skeleton-line' />


export const ParagrahSkeleton = ({ nLines = 7, hasTitle, hasIndent }) => {
  let cls = ''
  if (hasTitle) cls += ' hasTitle'
  if (hasIndent) cls += ' hasIndent'

  return (
    <div className={'div' + cls}> 
      {
        Array(nLines).fill(0).map((_, i) => (
          <Skeleton key={i} cls='skeleton-p-line' />
        ))
      }
    </div>
  )
}


// type(circle, square), size(small, normal)
export const PhotoSkeleton = ({ type = 'circle', size= 'small' }) => {
  let passedClasses = ''
  if (type) passedClasses += (' ' + type)
  if (size) passedClasses += (' ' + size)

  return <Skeleton cls={'skeleton-photo' + passedClasses} />
} 


export const CardSkeleton = () => {
  return <Skeleton cls="skeleton-card" />
}
