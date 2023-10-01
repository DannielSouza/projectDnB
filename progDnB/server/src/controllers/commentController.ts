import mongoose from "mongoose"
import express from "express"
import { getListingById } from "../models/listing"
import {CommentModel} from "../models/comment"
import { getSessionToken } from "../middlewares/getSessionToken"
import { getUserBySessionToken } from "../models/users"

export const getRating = async (req: express.Request, res: express.Response) => {
  try {
    const { listingId } = req.params
  
    const listing = await getListingById(listingId)
    if(!listing) return res.status(404).json({message: 'Propriedade não encontrada.'})
  
   
    const allRatings = await CommentModel.find({listing: listingId})
  

    if (allRatings.length === 0) {
      res.status(200).json({rating: 0})
    } else {
      const totalStars = allRatings.reduce((acc, comment) => acc + comment.stars, 0);
      const averageStars = totalStars / allRatings.length;
      res.status(200).json({rating: averageStars})
    }


  } catch (error) {
    console.error(`Erro ao cadastrar review: ${error}`)
    res.status(400).json({message: "Ops... Houve um erro ao consultar a nota."})
  }
}

export const getComments = async (req: express.Request, res: express.Response) => {
  try {
    const { listingId } = req.params
  
    const listing = await getListingById(listingId)
    if(!listing) return res.status(404).json({message: 'Propriedade não encontrada.'})
  
   
    const allComments = await CommentModel.find({listing: listingId}).populate('user').populate('listing').sort({ createdAt: 1 });
  
    res.status(200).send(allComments)
  } catch (error) {
    console.error(`Erro ao cadastrar review: ${error}`)
    res.status(400).json({message: "Ops... Houve um erro ao buscar as avaliações."})
  }
}

export const createComment = async (req: express.Request, res: express.Response) => {
  try {
    const { userId, stars, comment} = req.body
    const { listingId } = req.params
  
    if(!userId) return res.status(422).json({message: 'O id do usuário é obrigatório.'})
    if(!stars) return res.status(422).json({message: 'A nota em estrelas é obrigatória.'})
  
    const listing = await getListingById(listingId)
    if(!listing) return res.status(404).json({message: 'Propriedade não encontrada.'})
  
    const newReview: any = new CommentModel()

    newReview.listing= listingId,
    newReview.user= userId,
    newReview.stars = stars 
  
    if(comment) {
      newReview.comment = comment
    }
  
    await newReview.save()
    res.status(201).json({message: "Avaliação feita com sucesso!"})
  } catch (error) {
    console.error(`Erro ao cadastrar review: ${error}`)
    res.status(400).json({message: "Ops... Houve um erro ao fazer a avaliação."})
  }
}

export const deleteComment = async (req: express.Request, res: express.Response) => {
  try {
    const token = getSessionToken(req);
    const user = await getUserBySessionToken(token);

    if (!user) {
      return res.status(404).json({ message: "Usuário incorreto" });
    }

    const { listingId } = req.params
    if (!listingId) {
      return res.status(422).json({ message: "O id da propriedade é obrigatório" });
    }
    const { reviewId } = req.query;
    if (!reviewId) {
      return res.status(422).json({ message: "O id da review é obrigatório" });
    }

    const filter = {
      _id: reviewId,
      "listing":  listingId,
      "user": user._id,
    };

    const updatedListing = await CommentModel.findOneAndDelete(filter)

    if (!updatedListing) {
      return res.status(404).json({ message: "Revisão não encontrada ou não autorizada" });
    }

    res.status(200).json({message: "Avaliação excluida com sucesso."});
  } catch (error) {
    console.error(`Erro ao excluir a review: ${error}`)
    res.status(400).json({message: "Ops... Houve um erro ao excluir a avaliação."})
  }
}