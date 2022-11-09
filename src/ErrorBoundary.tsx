import React, { useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useQueryErrorResetBoundary } from 'react-query'
// import Bugsnag from '@bugsnag/js'

import s from './ErrorBoundary.module.scss'

// const bugsnag = new Client('fd983297ffd48ade73b5f6df44cfafa5')

const errorHandler = (error: Error) => {
  // Bugsnag.notify(error)
}

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: any
  resetErrorBoundary: () => void
}) {
  return (
    <div className={s.errorContainer}>
      <div className={s.errorContent}>
        <div className={s.errorText}>Что то пошло не так</div>
        <div className={s.errorDetailText}>{error ? error.toString() : null}</div>
        <button onClick={() => resetErrorBoundary()}>Попробовать снова</button>
      </div>
    </div>
  )
}

export const ErrorHandler = ({ children }: { children: React.ReactNode }) => {
  const { reset } = useQueryErrorResetBoundary()

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler} onReset={reset}>
      {children}
    </ErrorBoundary>
  )
}
