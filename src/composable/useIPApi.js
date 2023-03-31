import { ref } from "vue"

const API_DOMAIN = import.meta.env.VITE_API_DOMAIN
const API_KEY = import.meta.env.VITE_API_KEY

export default function () {
  const loading = ref(false)
  const data = ref(null)

  const doFetch = async (ip = '') => {
    loading.value = true
    data.value = null
    const fetch_response = await fetch(API_DOMAIN + `/api/v2/country,city?ipAddress=${ip}&apiKey=${API_KEY}`)
    data.value = await fetch_response.json()
    loading.value = false
  }

  return {
    loading,
    data,
    searchIP: doFetch
  }
}