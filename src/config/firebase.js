import { initializeApp } from 'firebase/app'
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDJdHfen72AuuXfP6o_kuOYH9vrKVJvhVg",
  authDomain: "marvel-app-ee21d.firebaseapp.com",
  projectId: "marvel-app-ee21d",
  storageBucket: "marvel-app-ee21d.firebasestorage.app",
  messagingSenderId: "979336921532",
  appId: "1:979336921532:web:15c809bbd49939199fabb9",
  measurementId: "G-74MCHF5K8Y"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const githubProvider = new GithubAuthProvider()
export const googleProvider = new GoogleAuthProvider()
