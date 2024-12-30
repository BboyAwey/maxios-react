import { globalConfig, modulize } from '@awey/maxios'
import { useMaxios } from './maxios-react'
import { useEffect } from 'react'

globalConfig({
  baseURL: '/api',
  headers: {
    'Some-Header-From-Global-Config': 'Some Header Value From Global Config'
  },
  data: {
    'Some-Data-From-Global-Config': 'Some Data Value From Global Config'
  }
}, {
  // requestError: err => {
  //   console.log('Request Error From Global Config:', err)
  // },
  // expect: response => {
  //   console.log('Expect From Global Config:', response)
  //   return response.data?.code === 0
  // },
  // error: res => {
  //   console.log('Error From Global Config:', res)
  // },
  loading: status => {
    console.log('Loading Status From Global Config:', status)
  },
  // extractor: response => {
  //   console.log('Extractor From Global Config:', response)
  //   return response.data.data
  // },
  // success: res => {
  //   console.log('Success From Global Config:', res)
  // },
  // anyway: res => {
  //   console.log('Anyway From Global Config:', res)
  // }
})

const request = modulize({
  headers: {
    'Some-Header-From-Module': 'Some Header Value From Module'
  },
  data: {
    'Some-Data-From-Module': 'Some Data Value From Module'
  }
}, {
  // requestError: err => {
  //   console.log('Request Error From Module:', err)
  // },
  // expect: response => {
  //   console.log('Expect From Module:', response)
  //   return response.data?.code === 0
  // },
  // error: res => {
  //   console.log('Error From Module:', res)
  // },
  loading: status => {
    console.log('Loading Status From Module:', status)
  },
  // extractor: response => {
  //   console.log('Extractor From Module:', response)
  //   return response.data.data
  // },
  // success: res => {
  //   console.log('Success From Module:', res)
  // },
  // anyway: res => {
  //   console.log('Anyway From Module:', res)
  // }
})

interface RequestBody {
  m: number,
  n: number
}

interface Response {
  code: number,
  data: Record<string, number>
  msg?: string
}

const myModel = {
  getShit: (reqBody: RequestBody) => {
    return request<RequestBody, Response, Record<string, number>>({
      url: 'get-shit',
      data: reqBody
    }, {
      // requestError: err => {
      //   console.log('Request Error From Request:', err)
      // },
      // expect: response => {
      //   console.log('Expect From Request:', response)
      //   return response.data?.code === 0
      // },
      // error: res => {
      //   console.log('Error From Request:', res)
      // },
      loading: status => {
        console.log('Loading Status From Request:', status)
      },
      // extractor: response => {
      //   console.log('Extractor From Request:', response)
      //   return response.data.data
      // },
      // success: res => {
      //   console.log('Success From Request:', res)
      // },
      // anyway: res => {
      //   console.log('Anyway From Request:', res)
      // }
    })
  }
}

function App() {
  const [getShit, result, loading] = useMaxios(myModel.getShit)

  useEffect(() => {
    getShit({
      m: 1,
      n: 2
    })
  }, [getShit])

  return (
    <>
      hello
      <div>
        <button onClick={() => {
          getShit({ m: 1, n: 2 })
        }}>
          fetch
          {
            loading ? ' loading...' : ''
          }
        </button>
        <div>
          {
            result ? JSON.stringify(result) : ''
          }
        </div>
      </div> 
    </>
  )
}

export default App
