import React, { useContext } from 'react'
import { locRouteContext } from '../context/LocRouteProvider';

function UseLocRoute() {
  return (
    useContext(locRouteContext)
  )
}

export default UseLocRoute
