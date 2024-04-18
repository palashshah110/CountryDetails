import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const withComponent = (Component: React.ComponentType<any>) => {
  const WithComponent = (props: any) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
  return (
    <Component 
    {...props}
    navigate={navigate}
    location={location}
    params={params}
    />
  )
}
return WithComponent
}
export default withComponent;