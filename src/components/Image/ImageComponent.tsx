import classNames from 'classnames'
import './ImageComponent.css'
import React, { ImgHTMLAttributes, useState } from 'react'

interface ImageType extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  src?: string
  skeleton?: boolean
}

export const ImageComponent: React.FC<ImageType> = ({
  className,
  src = '',
  onLoad,
  skeleton = false,
  ...rest
}: ImageType) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  return (
    <div
      className={classNames(
        'image',
        {
          'image--loaded': imgLoaded,
          'skeleton-gradient': skeleton || (src.length > 0 && !imgLoaded),
        },
        className
      )}
    >
      {src.length > 0 && (
        <img
          className="image__element"
          src={src}
          {...rest}
          onLoad={(e) => {
            setImgLoaded(true)
            onLoad && onLoad(e)
          }}
        />
      )}
    </div>
  )
}
