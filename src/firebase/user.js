import firebase from 'firebase/app'
import crud from './crud'

/**
 * Fetch user by email
 * @param {string} email user's email
 */
export const fetchUsersByEmail = async (email) => {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('email', '==', email)
    .limit(1)
    .get()
  return result.docs.map(ref => ({ uid: ref.id, ...ref.data() }))
}

export const fetchUser = (uid) => {
  const result = firebase
    .firestore()
    .collection('users')
    .doc(uid)
    .get()
  return result
}


export default crud('users', 'uid')
