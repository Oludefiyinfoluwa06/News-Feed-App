import { ref, uploadBytes } from "firebase/storage"
import { createContext } from "react"
import { db, storage } from "../firebase"
import { v4 } from "uuid"
import { addDoc, collection, deleteDoc, doc, documentId, getDocs, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import { useAuth } from '../hooks/useAuth'

export const NewsFeedContext = createContext()

export const NewsFeedProvider = ({ children }) => {
    const uploadImage = (imgName, imgExt, file) => {
        const imageRef = ref(storage, `feed-imgs/${imgName + v4() + '.' + imgExt}`)

        return uploadBytes(imageRef, file)
    }

    const { currentUser } = useAuth()

    const addNewsFeed = (imgUrl, title, category, content) => {
        return addDoc(collection(db, 'news-feeds'), { imgUrl, title, category, content, createdAt: serverTimestamp(), email: currentUser.email })
    }

    const getNewsFeed = async () => {
        const querySnapshot = await getDocs(query(collection(db, 'news-feeds'), where("email", "==", currentUser.email)))
        return querySnapshot
    }

    const getNewsFeedDetails = async (id) => {
        const docSnap = await getDocs(query(collection(db, 'news-feeds'), where(documentId(), "==", id)))
        return docSnap
    }

    const deleteNewsFeed = async (id) => {
        return await deleteDoc(doc(db, 'news-feeds', id))
    }

    const editNewsFeed = async (id, imgUrl, title, category, content) => {
        return await updateDoc(doc(db, 'news-feeds', id), {
            imgUrl,
            title,
            category,
            content,
            createdAt: serverTimestamp(),
            email: currentUser.email
        })
    }
    
    const value = {
        uploadImage,
        addNewsFeed,
        getNewsFeed,
        getNewsFeedDetails,
        deleteNewsFeed,
        editNewsFeed
    }

    return (
        <NewsFeedContext.Provider value={value}>
            {children}
        </NewsFeedContext.Provider>
    )
}