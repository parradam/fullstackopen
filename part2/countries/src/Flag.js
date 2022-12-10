import React from 'react'

function Flag({ url, alt }) {
  return (
    <div>
      <img src={url} alt={alt} />
    </div>
  )
}

export default Flag