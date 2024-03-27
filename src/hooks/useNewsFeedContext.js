import { useContext } from "react"
import { NewsFeedContext } from "../contexts/NewsFeedContext"

export const useNewsFeedContext = () => {
    return useContext(NewsFeedContext)
}