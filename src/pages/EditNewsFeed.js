import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useNewsFeedContext } from '../hooks/useNewsFeedContext'
import { getDownloadURL } from 'firebase/storage'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export const EditNewsFeed = () => {
    const { id } = useParams()

    const [file, setFile] = useState(null)

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { uploadImage, getNewsFeedDetails, editNewsFeed } = useNewsFeedContext()

    const navigate = useNavigate()

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
                    setTitle(info[0].title)
                    setContent(info[0].content)
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

    const handleEditFeed = async (e) => {
        e.preventDefault()

        setLoading(true)

        if (file === null) {
            return setError('Choose a file')
        }

        const imgName = file.name.split('.')[0]
        const imgExt = file.name.split('.')[1]

        try {
            const snapshot = await uploadImage(imgName, imgExt, file)
            const url = await getDownloadURL(snapshot.ref)
            await editNewsFeed(id, url, title, category, content)
            navigate('/')
        } catch (error) {
            console.log(error);
            setError('An error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh', marginTop: '20px' }}>
            <div className="w-100" style={{ maxWidth: '600px' }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Add a news feed</h2>
                        {error && <Alert variant='danger'>{error}</Alert>}
                        <Form onSubmit={handleEditFeed}>
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter the title</Form.Label>
                            <Form.Control 
                            type='file' 
                            name='feed-img'
                            onChange={(e) => setFile(e.target.files[0])}
                            />
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter the title</Form.Label>
                            <Form.Control
                            type='text'
                            name='title'
                            value={title}
                            onChange={(e) => {
                                setError('')
                                setTitle(e.target.value)
                            }}
                            />
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter the category</Form.Label>
                            <Form.Select
                            type='text'
                            name='category'
                            value={category}
                            onChange={(e) => {
                                setError('')
                                setCategory(e.target.value)
                            }}
                            >
                            <option value="">Select a category</option>
                            <option value="Technology">Technology</option>
                            <option value="Business">Business</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Music">Music</option>
                            <option value="Government">Government</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className='mb-3'>
                            <Form.Label>Enter the content</Form.Label>
                            <ReactQuill
                            theme='snow'
                            style={{ height: '200px', marginBottom: '40px', }}
                            name='content'
                            value={content}
                            onChange={setContent}
                            />
                        </Form.Group>

                        <Button disabled={loading} type='submit' className='w-100 mt-3'>{loading ? "Loading" : "Edit Feed"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    )
}
