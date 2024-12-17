import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, githubProvider, googleProvider } from '../config/firebase'

export const signInWithGithub = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, githubProvider)
    navigate('/')
    return result.user
  } catch (error) {
    console.error('Github login error:', error)
  }
}

export const signInWithGoogle = async (navigate) => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    navigate('/')
    return result.user
  } catch (error) {
    console.error('Google login error:', error)
  }
}

export const logout = async (navigate) => {
  try {
    await signOut(auth)
    navigate('/login')
  } catch (error) {
    console.error('Logout error:', error)
  }
}
