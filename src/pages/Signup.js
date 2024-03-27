import React, { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async e => {
    e.preventDefault()

    if (email === '' || password === '') return setError('Input fields are empty')

    if (password !== passwordConfirm) return setError('Passwords do not match')

    if (password.length < 6) return setError('Password length must be at least 6 characters or more')

    try {
      setLoading(true)
      await signup(email, password)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign up</h2>
            {error && <Alert variant='danger'>{error}</Alert>}
            <Form onSubmit={handleSignup}>
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
              <Form.Group id='password-confirm' className='mt-3'>
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control type='password' value={passwordConfirm} onChange={e => {
                  setError('')
                  setPasswordConfirm(e.target.value)
                }} required />
              </Form.Group>
              <Button disabled={loading} type='submit' className='w-100 mt-3'>Sign up</Button>
            </Form>
          </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>
          Already have an account? <Link to='/login'>Login</Link>
        </div>
      </div>
    </Container>
  )
}

export default Signup
