import express  from "express";
import { UserModel, getUserByEmail, getUserBySessionToken } from "../models/users";
import bcrypt from "bcryptjs"
import { authentication, random } from "../helpers/auth";
import { getSessionToken } from "../middlewares/getSessionToken";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {name, email, password, confirmPassword} = req.body

    if(!name) return res.status(422).json({message: 'O nome é obrigatório.'})
    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(!password) return res.status(422).json({message: 'A senha é obrigatória.'})
    if(!confirmPassword) return res.status(422).json({message: 'A confirmação de senha é obrigatório.'})
    if(password !== confirmPassword) return res.status(422).json({message: 'As senhas são diferentes.'})

    const isUserExist = await getUserByEmail(email)
    if(isUserExist) return res.status(400).json({message: "O e-mail já está em uso."})

    const salt = await bcrypt .genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const newUser = await UserModel.create({
      name,
      email,
      authentication:{
        password: passwordHash
      }
    })
    return res.status(201).send(newUser)    
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao criar o usuário."})
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password} = req.body

    if(!email) return res.status(422).json({message: 'O e-mail é obrigatório.'})
    if(!password) return res.status(422).json({message: 'A senha é obrigatória.'})

    const user = await getUserByEmail(email).select("+authentication.password")
    if(!user) return res.status(404).json({message: "Este usuário não existe."})

    const checkedPassword = await bcrypt.compare(password, user.authentication.password)
    if(!checkedPassword) return res.status(422).json({message: 'Senha inválida.'})

    const salt = random()
    user.authentication.sessionToken = authentication(salt, user._id.toString())

    await user.save()
    res.cookie("DNB-AUTH", user.authentication.sessionToken, {domain: "localhost", path: "/"})
    res.status(200).send(user).end()
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao entrar na conta."})
  }
}

export const loginWithToken = async (req: express.Request, res: express.Response) => {
  try {
    const { token } = req.params
    if(!token) return res.status(422)

    const user = await getUserBySessionToken(token)
    if(!user) return res.status(422)
    
    const salt = random()
    user.authentication.sessionToken = authentication(salt, user._id.toString())

    await user.save()
    res.cookie("DNB-AUTH", user.authentication.sessionToken, {domain: "localhost", path: "/"})
    res.status(200).send(user).end()
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao entrar na conta."})
  }
}

export const changePassword = async (req: express.Request, res: express.Response) => {
  try {
    const {oldPassword, password, confirmPassword} = req.body

    const token = await getSessionToken(req)
    if(!token) return res.status(400).json({message: "Token inválido."})

    const user = await getUserBySessionToken(token).select("+authentication.password")
    if(!user) return res.status(400).json({message: "Houve um erro ao trocar a senha deste usuário."})

    if(password !== confirmPassword) return res.status(422).json({message: 'A senha e a confirmação de senha são diferentes.'})

    const checkedPassword = await bcrypt.compare(oldPassword, user.authentication.password)
    if(!checkedPassword) return res.status(422).json({message: 'Senha antiga inválida.'})

    const salt = await bcrypt .genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    user.authentication.password = passwordHash
    await user.save()
    res.status(200).json({message: "Senha alterada com sucesso."})
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao trocar a senha."})
  }
}