'use client'

import React from 'react'
import useActiveChannel from '../hooks/useActiveChannel'

export const ActiveStatus = () => {
  useActiveChannel();
  
  return null
}
