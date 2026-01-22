import { Heart, Star } from "lucide-react"
import type { IhotelData } from "../types"
import { useState } from "react"

interface IHotelCardProps {
    data: IhotelData
}

const formDate = (s: string, e: string) => { 
    const start =  new Date(s)
    const end = new Date(e)

    const startMonth = start.toLocaleString('en-US', { month: 'short'})
    const endMonth = end.toLocaleString('en-US', { month: 'short'})

    const startDate = start.getDate()
    const endDate = end.getDate()

    const startYear = start.getFullYear()
    const endYear = end.getFullYear()

    if (startMonth === endMonth && startYear === endYear) {
        return `${startMonth} ${startDate} - ${endDate}`
    }

    if(startYear === endYear) {
        return `${startMonth} ${startDate} - ${endMonth} ${endDate}`
    }

    return `${startMonth} ${startDate}, ${startYear} - ${endMonth} ${endDate}, ${endYear}`
}

export default function HotelCard({ data }: IHotelCardProps) {
    const [isLiked, setIsLiked] = useState(false)
    const handleLike = () => {
        setIsLiked(!isLiked)
    }

    return (
        <div>
            <div className="mb-4 relative">
                <img className="h-[310px] w-full rounded-xl object-cover" src={data.imageUrl} alt="hotel-card" />
                <button className="absolute top-3 right-3" onClick={handleLike}>
                    <Heart className="text-white" fill={isLiked ? "white" : "gray"}/>
                </button>
            </div>

            <div>
                <div className="mb-1 flex items-center justify-between">
                    <div className="font-medium">{data.location}</div>
                    <div className="flex items-center gap-1">
                        <Star className="w-3.5" />
                        <span>{data.rating} ({data.reviews})</span>
                    </div>
                </div>
                <div className="mb-1 text-sm text-gray-400">{data.distance} kilometers</div>
                <div className="mb-2 text-sm text-gray-400">
                    {formDate(data.availableDates.start, data.availableDates.end)}
                </div>
                <div>
                    <span className="font-semibold">${data.pricePerNight}</span> night
                </div>
            </div>
        </div>
    )
}
