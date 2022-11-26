import React from 'react'
import Part from './Part'

function Content(props) {
  return (
    <>
      <Part part={props.part1} />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </>
  )
}

export default Content