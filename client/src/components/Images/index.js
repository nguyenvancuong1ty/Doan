import React, { useState } from 'react'
import images from '~/assets/images'

function Image({src, alt,fallback: customFallback = images.noImage,...props}) {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFallback)
    }
  return (
    <img {...props} src={fallback || src} alt={alt} onError={handleError}/>
  )
}

export default Image
