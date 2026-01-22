import { onValue, startAfter, limitToFirst, orderByKey, ref, query } from "firebase/database"
import { useCallback, useEffect, useRef, useState } from "react"
import { db } from "./utils"
import HotelCard from "./components/HotelCard"
import type { IhotelData } from "./types"

const limit = 5

function App() {
  const [hotels, setHotels] = useState<IhotelData[]>([])
  const [lastItemkey, setLastItemKey] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
 
  const loadingRef = useRef<HTMLDivElement | null>(null)

  const loadHotels = useCallback((after?: string) => {
    if(loading) return

    setLoading(true)
    const queryConstraints = [
      limitToFirst(limit),
      orderByKey(),
    ]

    if(after){
      queryConstraints.push(startAfter(after))
    }
    
    const hotelsQuery = query(
      ref(db, 'hotels'), 
      ...queryConstraints,
    )
    
    onValue(hotelsQuery, (snapshot) => {
      if(snapshot.exists()){
        const hotelKeys = Object.keys(snapshot.val())
        const hotelsData = Object.values(snapshot.val()) as IhotelData[]
        setLastItemKey(hotelKeys[hotelsData.length - 1])
        setHotels(prev => after ? [...prev, ...hotelsData] : [...hotelsData])
      }

      setLoading(false)
    })
  }, [loading])

  useEffect(() => {
    loadHotels()
  }, [loadHotels])

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      const first = entries[0]

      if(!loading && first.isIntersecting && lastItemkey) {
        loadHotels(lastItemkey)
      } 
    }

    const options: IntersectionObserverInit = { threshold: 0.1 }

    const observe = new IntersectionObserver(callback, options)
    
    const loadingRefCurrent = loadingRef.current

    if(loadingRefCurrent) {
      observe.observe(loadingRefCurrent)
    }

    return () => {
      if(loadingRefCurrent){
        observe.observe(loadingRefCurrent)
      }
    }
  },[lastItemkey, loading, loadHotels])

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Explore</h1>

      <section className="flex flex-col gap-6">
        {hotels.map((hotel) =>
          <HotelCard key={hotel.id} data={hotel} />
        )}

        <div ref={loadingRef} className="flex items-center justify-center">
          {loading && <div className="animate-spin w-6 h-6 border-b-2 border-gray-400 rounded-full mb-6"></div>}
        </div>
      </section>
    </main>
  )
}

export default App
