import React from 'react'
import { useParams } from 'react-router-dom'

export const ViewNewsFeed = () => {
    const { id } = useParams()

    return (
        <div className='mt-4'>
            News feed id: {id}
        </div>
    )
}
