import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { IPartnersPosts } from './types'

export const initializeAPI = () => {
  initializeApp({
    apiKey: 'AIzaSyALixa0xIMZo39PEUdu1z_i_rj1MFKQTpQ',
    authDomain: 'front-news-feed.firebaseapp.com',
    projectId: 'front-news-feed',
    storageBucket: 'front-news-feed.appspot.com',
    messagingSenderId: '590209172328',
    appId: '1:590209172328:web:0c91346fa6ffd8bd9a4cdd',
  })

  getFirestore()
}

export const getPartnersArticles = async (): Promise<IPartnersPosts[]> => {
  const db = getFirestore()

  const querySnapshot = await getDocs(collection(db, 'partners-posts'))

  const articles: IPartnersPosts[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Omit<IPartnersPosts, 'id'>

    articles.push({
      id: doc.id,
      ...data,
    })
  })

  return articles
}
