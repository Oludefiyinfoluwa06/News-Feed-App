import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNewsFeedContext } from '../hooks/useNewsFeedContext'


export const ViewNewsFeed = () => {
    const [loading, setLoading] = useState(false)
    const [newsDetails, setNewsDetails] = useState({})
    const { id } = useParams()
    
    const { getNewsFeedDetails } = useNewsFeedContext()
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000)
        return date.toLocaleDateString()
    }

    useEffect(() => {
        setLoading(true)

        const fetchData = async () => {
            try {
                const response = await getNewsFeedDetails(id)
                const docs = response.docs

                if (docs && Array.isArray(docs)) {
                    const info = await docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setNewsDetails(info[0])
                } else {
                    console.log('Invalid data structure from getNewsFeed')
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [id, getNewsFeedDetails])

    return (
        <div className='mt-2'>
            {loading ? <p>Loading</p> : (
                <div className='p-4'>
                    <img src={newsDetails.imgUrl} alt={newsDetails.title} className='w-100 m-auto object-fit-cover object-position-center' style={{ height: '350px' }} />
                    <div className="d-flex align-items-center justify-content-between mt-3">
                        <p>{newsDetails.title}</p>
                        <p>{formatDate(newsDetails.createdAt?.seconds)}</p>
                    </div>

                    <div className="mt-2" dangerouslySetInnerHTML={{ __html: newsDetails.content }}></div>
                </div>
            )}
        </div>
    )
}
