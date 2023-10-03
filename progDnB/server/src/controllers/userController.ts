import express from "express"
import { UserModel, getUserByEmail, getUserById, getUserBySessionToken, getUsers } from "../models/users"
import { getSessionToken } from "../middlewares/getSessionToken"
import { uploadImage } from "../helpers/imageUploader"

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers()
    return res.status(200).send(users)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao buscar os usuários."})
  }
} 

export const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params

    const deletedUser = await UserModel.deleteOne({id})
    res.status(200).send(deletedUser)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao excluir o usuário."})
  }
}

export const editUserInfo = async (req: express.Request, res: express.Response) => {
  try {
    const token = await getSessionToken(req)
    if(!token) return res.status(400).json({message: "Token inválido."})

    const user = await getUserBySessionToken(token).select("+authentication.password")
    if(!user) return res.status(400).json({message: "Houve um erro ao editar as informações do usuário."})

    const {name, email, gender, birthdate} = req.body

    const existingEmail = await getUserByEmail(email)

    if(user.email !== email && existingEmail) return res.status(400).json({message: "Este e-mail já está em uso."})

    user.name = name
    user.email = email
    user.gender = gender
    user.birthdate = birthdate

    await user.save()
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao editar as informações do usuário."})
  }
}

export const editUserImage = async (req: express.Request, res: express.Response) => {
  const token = await getSessionToken(req)
    if(!token) return res.status(400).json({message: "Token inválido."})

    const user = await getUserBySessionToken(token).select("+authentication.password")
    if(!user) return res.status(400).json({message: "Houve um erro ao editar a foto do usuário."})

    const file = req.files as any

    try {
      const newImageUrl = await uploadImage(file[0].buffer , `user/${new Date().getUTCMilliseconds() * (Math.random() * 1000)}`)
      user.image = newImageUrl
      await user.save()
      res.status(200).json({message: "Foto de perfil atualizada com sucesso."})
    } catch (error) {
      console.log(error)
      return res.status(400).json({message: "Ops.. Houve um erro ao tentar atualizar a foto de perfil."})
    }
}

export const favoriteListing = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = await getSessionToken(req)
    const user = await getUserBySessionToken(sessionToken)
  
    const { listingId } = req.params
    if(!listingId) return res.status(400).json({message: "O id da propriedade é obrigatório."})

    let alreadyFavorited = false
    user.favoriteIds.forEach(favorite=> {
      if(favorite === listingId) alreadyFavorited = true
    })

    if(alreadyFavorited) return res.status(422).json({message: "Esta propriedade já está nos favoritos"})

    user.favoriteIds.push(listingId)
    await user.save()
  
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao favoritar."})
  }
}

export const removeFavoriteListing = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = await getSessionToken(req)
    const user = await getUserBySessionToken(sessionToken)
  
    const { listingId } = req.params
    if(!listingId) return res.status(400).json({message: "O id da propriedade é obrigatório."})

    const userFavorites = user.favoriteIds.filter(favorite=> favorite !== listingId)
    user.favoriteIds = userFavorites
    await user.save()
  
    res.status(200).send(user)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao excluir este favorito."})
  }
}
