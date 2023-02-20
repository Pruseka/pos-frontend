import { useRouteError } from 'react-router-dom'

const ErrorPage: React.FC = () => {
   const error = useRouteError()
   console.error(error)
   return (
      <div
         style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
         }}
      >
         <h1>Oops!</h1>
         <p>Sorry, an unexpected error has occurred.</p>
         <p>
            <i>{(error as any).statusText || (error as any).message}</i>
         </p>
      </div>
   )
}

export default ErrorPage
