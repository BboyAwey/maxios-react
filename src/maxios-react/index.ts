import { useCallback, useState } from 'react'
import { modulize } from '@awey/maxios'

export const useMaxios = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Array<any>,
  K extends (...args: T) => ReturnType<ReturnType<typeof modulize>>
>(
  fn: K
): [
  (...args: Parameters<K>) => void,
  Parameters<Parameters<ReturnType<K>['success']>[0]>[0] | null,
  boolean,
  Parameters<Parameters<ReturnType<K>['error']>[0]>[0] | null,
  Parameters<Parameters<ReturnType<K>['requestError']>[0]>[0] | null
] => {
  const [requestError, setRequestError] = useState<Parameters<Parameters<ReturnType<K>['requestError']>[0]>[0] | null>(null)
  const [errorResult, setErrorResult] = useState<Parameters<Parameters<ReturnType<K>['error']>[0]>[0] | null>(null)
  const [result, setResult] = useState<Parameters<Parameters<ReturnType<K>['success']>[0]>[0] | null>(null)
  const [loading, setLoading] = useState<Parameters<Parameters<ReturnType<K>['loading']>[0]>[0]>(false)

  const request = useCallback((...args: T) => {
    fn(...args)
      .requestError(setRequestError)
      .error(setErrorResult)
      .loading(status => {
        console.log('Loading Status:', status, '---')
        setLoading(status)
      })
      .success(setResult)
  }, [fn])

  return [
    request,
    result,
    loading,
    errorResult,
    requestError
  ]
}

export default useMaxios
