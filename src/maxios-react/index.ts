import { useCallback, useState } from 'react'
import { modulize } from '@awey/maxios'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useMaxios = <T extends Array<any>, K extends (...args: T) => ReturnType<ReturnType<typeof modulize>>>(
  fn: K,
  callbacks?: {
    requestError?: Parameters<ReturnType<K>['requestError']>[0],
    error?: Parameters<ReturnType<K>['error']>[0],
    success?: Parameters<ReturnType<K>['success']>[0],
    loading?: Parameters<ReturnType<K>['loading']>[0],
    anyway?: Parameters<ReturnType<K>['anyway']>[0]
  }
) => {
  const [requestError, setRequestError] = useState<Parameters<Parameters<ReturnType<K>['requestError']>[0]>[0] | null>(null)
  const [errorResult, setErrorResult] = useState<Parameters<Parameters<ReturnType<K>['error']>[0]>[0] | null>(null)
  const [result, setResult] = useState<Parameters<Parameters<ReturnType<K>['success']>[0]>[0] | null>(null)
  const [loading, setLoading] = useState<Parameters<Parameters<ReturnType<K>['loading']>[0]>[0]>(false)


  const request = useCallback((...args: T) => {
    fn(...args)
      .requestError(axiosError => {
        setRequestError(axiosError)
        if (callbacks?.requestError) {
          return callbacks.requestError(axiosError)
        }
      })
      .error(errorResult => {
        setErrorResult(errorResult)
        if (callbacks?.error) {
          return callbacks.error(errorResult)
        }
      })
      .loading(status => {
        setLoading(status)
        if (callbacks?.loading) {
          return callbacks.loading(status)
        }
      })
      .success(result => {
        setResult(result)
        if (callbacks?.success) {
          return callbacks.success(result)
        }
      })
  }, [callbacks, fn])

  return [
    request,
    result,
    loading,
    errorResult,
    requestError
  ]
}

export default useMaxios
