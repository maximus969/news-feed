import { FirebaseApp, initializeApp } from 'firebase/app'
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
import { IPartnersPosts } from './types'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getAuth } from 'firebase/auth'

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

export const getPartnersArticles = async (): Promise<IPartnersPosts[]> => {
  const db = getFirestore()
  const articles: IPartnersPosts[] = []

  try {
    const querySnapshot = await getDocs(collection(db, partnersPostCollection))
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnersPosts, 'id'>
      articles.push({
        id: doc.id,
        ...data,
      })
    })
  } catch (err) {
    return Promise.reject(err)
  }

  return articles
}

export const createPartnerArticle = async (data: Omit<IPartnersPosts, 'id' | 'created'>): Promise<void> => {
  const db = getFirestore()

  try {
    await addDoc(collection(db, partnersPostCollection), data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export const getPartnerArticle = async (id: string): Promise<IPartnersPosts> => {
  const db = getFirestore()
  const docRef = doc(db, 'partners-posts', id)

  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<IPartnersPosts, 'id'>
      return {
        id: docSnap.id,
        ...data,
      }
    } else {
      throw new Error('Такой статьи нет!')
    }
  } catch (err) {
    return Promise.reject(err)
  }
}

export const updatePartnerArticle = async (id: string, data: Omit<IPartnersPosts, 'id' | 'created'>): Promise<any> => {
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
export const getSortedPartnerArticle = async (): Promise<IPartnersPosts | null> => {
  const db = getFirestore()
  let article: IPartnersPosts | null = null

  try {
    const q = query(collection(db, partnersPostCollection), orderBy('created', 'desc'), limit(1))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<IPartnersPosts, 'id'>

      article = {
        id: doc.id,
        ...data,
      }
    })
  } catch (err) {
    return Promise.reject(err)
  }
  return article
}
