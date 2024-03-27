import { ref, uploadBytes } from "firebase/storage"
import { createContext } from "react"
import { db, storage } from "../firebase"
import { v4 } from "uuid"
import { addDoc, collection, getDocs, serverTimestamp } from "firebase/firestore"

export const NewsFeedContext = createContext()

export const NewsFeedProvider = ({ children }) => {
    const uploadImage = (imgName, imgExt, file) => {
        const imageRef = ref(storage, `feed-imgs/${imgName + v4() + '.' + imgExt}`)

        return uploadBytes(imageRef, file)
    }

    const addNewsFeed = (imgUrl, title, category, content) => {
        return addDoc(collection(db, 'news-feeds'), { imgUrl, title, category, content, createdAt: serverTimestamp() })
    }

    const getNewsFeed = async () => {
        const querySnapshot = await getDocs(collection(db, 'news-feeds'))
        return querySnapshot
    }
    
    const value = {
        uploadImage,
        addNewsFeed,
        getNewsFeed
    }

    return (
        <NewsFeedContext.Provider value={value}>
            {children}
        </NewsFeedContext.Provider>
    )
}