import React from 'react';
import { img_path } from '../../../environment';

const ImageWithBasePath = (props) => {
  if (!props.src) {
    console.error("Error: 'src' is required in ImageWithBasePath component.");
    return null; // Or return a default placeholder image
  }

  // Check if the provided src is an absolute URL
  const isAbsoluteUrl = props.src.startsWith('http://') || props.src.startsWith('https://');
  
  // Use the src as is for absolute URLs, otherwise prepend the base path
  const fullSrc = isAbsoluteUrl ? props.src : `${img_path}${props.src}`;

  return (
    <img
      className={props.className}
      src={fullSrc}
      height={props.height}
      alt={props.alt || 'Image'}
      width={props.width}
      id={props.id}
    />
  );
};

export default ImageWithBasePath;
