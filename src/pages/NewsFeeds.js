import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { useNewsFeedContext } from '../hooks/useNewsFeedContext'
import { Link } from 'react-router-dom'

const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000)
  return date.toLocaleDateString()
}

export const NewsFeeds = () => {
  const [newsInfo, setNewsInfo] = useState()
  const [loading, setLoading] = useState(false)
  
  const { getNewsFeed } = useNewsFeedContext()

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const response = await getNewsFeed()
        const docs = response.docs

        if (docs && Array.isArray(docs)) {
          const info = await docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          setNewsInfo(info)
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
  }, [getNewsFeed])

  useEffect(() => {
    console.log(newsInfo)
  }, [newsInfo])

  return (
    <Table responsive bordered hover className="mx-auto my-5 w-100">
      <thead className="bg-primary text-white">
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Creation Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {newsInfo?.length > 0 ? (
          newsInfo.map((info) => (
            <tr key={info.id}>
              <td>{info.title}</td>
              <td>{info.category}</td>
              <td>{formatDate(info.createdAt)}</td>
              <td>
                <div className="d-flex justify-content-start gap-2">
                  <Link to={`${info.id}`}>
                    <button className="btn btn-primary btn-sm me-2">View</button>
                  </Link>
                  <button className="btn btn-primary btn-sm me-2">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </div>
              </td>
            </tr>
          ))
        ) : loading ? (
          <tr>
            <td colSpan={4} className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </td>
          </tr>
        ) : (
          <tr>
            <td colSpan={4} className="text-center">
              There are no news feeds
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  )
}