import React from 'react'
import { Helmet } from 'react-helmet'

export const MetaData = ({titulo}) => {
  return (
    <Helmet>
        <title>{ `${titulo} - Altiora Test` }</title>
    </Helmet>
        
  )
}
