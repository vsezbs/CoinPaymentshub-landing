import { QueryClientProvider } from 'react-query'
import queryClient from 'apiClient/queryClient'
import { BrowserRouter } from 'react-router-dom'
import * as IsMobile from 'components/app/IsMobile'

import { ErrorHandler } from './ErrorBoundary'
import AppView from './AppView'
import './app.scss'

function App() {
  return (
    <ErrorHandler>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <IsMobile.Provider>
            <AppView />
          </IsMobile.Provider>
        </BrowserRouter>
      </QueryClientProvider>
    </ErrorHandler>
  )
}

export default App
