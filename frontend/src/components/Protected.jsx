import React from 'react'
import { Navigate } from 'react-router-dom'
function Protected({ user, children }) {
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}
export default Protected