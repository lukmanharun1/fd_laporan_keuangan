import React from 'react'
import propTypes from 'prop-types';
export default function IconInfo(props) {
    let { width, height } = props;
    const className = ['fill-green-500', props.className].join(' ');
    if (!width) width = 24
    if (!height) height = 24

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 0 24 24" width={width} className={className}><path d="M0 0h24v24H0V0z" fill="none"  /><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
  )
}

IconInfo.propTypes = {
    className: propTypes.string,
    width: propTypes.number,
    height: propTypes.number
}