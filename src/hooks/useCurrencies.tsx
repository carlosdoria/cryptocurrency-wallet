import { createContext, ReactNode, useContext, useState } from 'react'
import { bitcoinsApi } from 'services/bitcoins'
import { britasApi } from 'services/britas'

interface CurrenciesProviderProps {
  children: ReactNode
}

interface IBritasPrice {
  cotacaoCompra: number
  cotacaoVenda: number
  dataHoraCotacao: string
}

interface IBitcoinsPrice {
  buy: string
  sell: string
}

interface ICurrenciesContext {
  britasPrice: IBritasPrice | undefined
  bitcoinsPrice: IBitcoinsPrice | undefined
  getBritasPrice: () => void
  getBitcoinsPrice: () => void
}

const CurrenciesContext = createContext({} as ICurrenciesContext)

export function CurrenciesProvider ({ children }: CurrenciesProviderProps) {
  const [ britasPrice, setBritasPrice ] = useState<IBritasPrice>()
  const [ bitcoinsPrice, setBitcoinsPrice ] = useState<IBitcoinsPrice>()

  async function getBritasPrice () {
    const date = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    }).format(new Date())

    const formattedDate = date.replace(/\//g, '-')

    const { data } = await britasApi.get(`/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${formattedDate}'`)
    setBritasPrice(data.value[ 0 ])
  }

  async function getBitcoinsPrice () {
    const { data } = await bitcoinsApi.get('/BTC/ticker/')
    setBitcoinsPrice(data.ticker)
  }

  return (
    <CurrenciesContext.Provider value={{
      britasPrice,
      bitcoinsPrice,
      getBritasPrice,
      getBitcoinsPrice
    }}>
      {children}
    </CurrenciesContext.Provider>
  )
}

export function useCurrencies () {
  const context = useContext(CurrenciesContext)
  return context
}
