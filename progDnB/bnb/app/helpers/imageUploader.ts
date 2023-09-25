import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebase"

export const imageUploader = async (file: File, path: "user" | "listing") =>{
  const imagesUrl: Array<string> = []

  await uploadBytes(
    ref(storage, `${path}/${file.name}${crypto.randomUUID()}`),
    file
  ).then((snapshot) =>
    getDownloadURL(snapshot.ref).then((url) => imagesUrl.push(url))
  )

  return imagesUrl
}
