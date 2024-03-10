import { ArticleItemType } from '../features/ArticleItem/types'
import { NewsResponse } from '../features/articlesList/types'
import { CategoriesType } from '../features/categories/types'
import { PartnersPostsType } from '../features/partnersArticles/types'
import { RelatedArticlesType } from '../features/relatedNews/types'
import { SourcesType } from '../features/Source/types'
import { FirebaseApp, initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export const initializeAPI = (): FirebaseApp => {
  const firebaseApp = initializeApp({
    apiKey: 'AIzaSyALixa0xIMZo39PEUdu1z_i_rj1MFKQTpQ',
    authDomain: 'front-news-feed.firebaseapp.com',
    projectId: 'front-news-feed',
    storageBucket: 'front-news-feed.appspot.com',
    messagingSenderId: '590209172328',
    appId: '1:590209172328:web:0c91346fa6ffd8bd9a4cdd',
  })

  getAuth(firebaseApp)
  getFirestore(firebaseApp)
  getStorage(firebaseApp)

  return firebaseApp
}

const partnersPostCollection = 'partners-posts'

export const getPartnersArticles = async (): Promise<PartnersPostsType[]> => {
  const db = getFirestore()
  const articles: PartnersPostsType[] = []

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostCollection))
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnersPostsType, 'id'>
      articles.push({
        id: Number(doc.id),
        ...data,
      })
    })
  } catch (err) {
    return Promise.reject(err)
  }

  return articles
}

export const createPartnerArticle = async (data: Omit<PartnersPostsType, 'id' | 'created'>): Promise<any> => {
  const db = getFirestore()

  try {
    await addDoc(collection(db, partnersPostCollection), data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getPartnerArticle = async (id: string): Promise<PartnersPostsType> => {
  const db = getFirestore()
  const docRef = doc(db, 'partners-posts', id)

  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<PartnersPostsType, 'id'>
      return {
        id: Number(docSnap.id),
        ...data,
      }
    } else {
      throw new Error('Такой статьи нет!')
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updatePartnerArticle = async (
  id: string,
  data: Omit<PartnersPostsType, 'id' | 'created'>
): Promise<any> => {
  const db = getFirestore()
  const updatedArticle = doc(db, partnersPostCollection, id)

  try {
    await updateDoc(updatedArticle, data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const deletePartnerArticle = async (id: string): Promise<any> => {
  const db = getFirestore()
  const ref = doc(db, partnersPostCollection, id)
  try {
    await deleteDoc(ref)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const uploadFile = async (file: File): Promise<string> => {
  const storage = getStorage()
  const storageRef = ref(storage, `${file.name} - ${Date.now()}`)

  try {
    const snapshot = await uploadBytes(storageRef, file)
    const url = getDownloadURL(snapshot.ref)

    return url
  } catch (err) {
    return Promise.reject(err)
  }
}

// sorted article
export const getSortedPartnerArticle = async (): Promise<PartnersPostsType | null> => {
  const db = getFirestore()
  let article: PartnersPostsType | null = null

  try {
    const q = query(collection(db, partnersPostCollection), orderBy('created', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnersPostsType, 'id'>

      article = {
        id: Number(doc.id),
        ...data,
      }
    })
  } catch (err) {
    return Promise.reject(err)
  }
  return article
}

export const getMainPartnerArticle = async (): Promise<PartnersPostsType | null> => {
  const db = getFirestore()
  let article = null

  try {
    const q = query(collection(db, partnersPostCollection), orderBy('created', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<PartnersPostsType, 'id'>

      article = {
        id: doc.id,
        ...data,
      }
    })
  } catch (error) {
    return Promise.reject(error)
  }

  return article
}

export const apiFetchNews = (): Promise<NewsResponse> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/news').then((response) => response.json())
}

export const apiFetchTrends = (): Promise<NewsResponse> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/ru/trends').then((response) => response.json())
}

export const apiFetchCategory = (id: number): Promise<NewsResponse> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/ru/news/${id}`).then((response) => response.json())
}

export const apiFetchCategories = (): Promise<CategoriesType[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/categories').then((response) => response.json())
}

export const apiFetchSources = (): Promise<SourcesType[]> => {
  return fetch('https://frontend.karpovcourses.net/api/v2/sources').then((response) => response.json())
}

export const apiFetchRelatedArticles = (id: number): Promise<RelatedArticlesType> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/related/${id}?count=9`).then((response) =>
    response.json()
  )
}

export const apiFetchArticleItem = (id: number): Promise<ArticleItemType> => {
  return fetch(`https://frontend.karpovcourses.net/api/v2/news/full/${id}`).then((response) => response.json())
}
