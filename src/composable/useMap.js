import { onBeforeUnmount, onMounted, ref } from "vue"
import L from 'leaflet'
import "leaflet/dist/leaflet.css"
import 'leaflet/dist/images/marker-icon-2x.png'
import 'leaflet/dist/images/marker-icon.png'
import 'leaflet/dist/images/marker-shadow.png'

export default function () {
  const map = ref(null)
  const endLoad = ref(false)
  const markerList = ref([])

  const panTo = ({ lat, lng }) => {
    removeAllMarkers()
    map.value.panTo([lat + 0.1, lng])
    const marker = L.marker([lat, lng])
      .bindPopup('<p>Hi! you are here.</p>')
      .addTo(map.value)
    marker.openPopup()
    markerList.value.push(marker)
  }

  const removeAllMarkers = () => {
    markerList.value.forEach(marker => {
      marker.remove()
    })
  }

  onMounted(() => {
    map.value = L.map('map', {
      center: [25.033493, 121.564101],
      zoom: 13
    })
    map.value.whenReady(() => {
      endLoad.value = true
    })
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value)
  })

  onBeforeUnmount(() => {
    map.value.remove()
  })

  return {
    panTo,
    endLoad
  }
}