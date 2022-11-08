import React from 'react'
import {recipes} from '../pages/index.jsx'

function Data() {
  const bloop = recipes
  console.log(bloop)
  return (
    <div>Data</div>
  )
}

export default Data

import React from 'react'

export const Data = () => {
  return (
    <div>Data</div>
  )
}
