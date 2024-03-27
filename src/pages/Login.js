import React, { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    if (email === '' || password === '') return setError('Input fields are empty')

    try {
      setLoading(true)
      await login(email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Failed to log in')
    }

    setLoading(false)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Login</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleLogin}>
              <Form.Group id='email' className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} onChange={e => {
                  setError('')
                  setEmail(e.target.value)
                }} required />
              </Form.Group>
              <Form.Group id='password' className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={e => {
                  setError('')
                  setPassword(e.target.value)
                }} required />
              </Form.Group>
              <Button disabled={loading} type='submit' className='w-100 mt-3'>Login</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Need an account? <Link to='/signup'>Signup</Link>
        </div>
      </div>
    </Container>
  )
}

export default Login
