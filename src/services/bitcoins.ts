import axios from 'axios'

export const bitcoinsApi = axios.create({
  baseURL: 'https://www.mercadobitcoin.net/api',
})
