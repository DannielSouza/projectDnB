import express from "express"
import { ReservationModel } from "../models/reservation"
import { getListingById } from "../models/listing"
import { getUserBySessionToken } from "../models/users"
import { getSessionToken } from "../middlewares/getSessionToken"

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const {
      startDate,
      endDate,
      totalPrice,
      userId,
      authorId,
      listingId
    } = req.body

    if(!startDate) return res.status(422).json({message: 'A data de inicio é obrigatória.'})
    if(!endDate) return res.status(422).json({message: 'A data final é obrigatória.'})
    if(!totalPrice) return res.status(422).json({message: 'O valor total é obrigatório.'})
    if(!userId) return res.status(422).json({message: 'O id do usuário é obrigatório.'})
    if(!authorId) return res.status(422).json({message: 'O id do dono é obrigatório.'})
    if(!listingId) return res.status(422).json({message: 'A propriedade é obrigatória.'})
   

    const listing = await getListingById(listingId)

    const newReservation = await ReservationModel.create({
      startDate,
      endDate,
      totalPrice,
      user: userId,
      author: authorId,
      listing: listingId
    })

    listing.reservations.push(newReservation._id)
    
    listing.save()
    return res.status(201).send(newReservation)    
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao criar a reserva."})
  }
}

export const getAllReservations = async (req: express.Request, res: express.Response) => {
  try {
    const { listingId, userId, authorId } = req.query; // Obtenha os parâmetros da consulta

    let query: any = {};

    if (listingId) {
      query.id = listingId 
    }
    if (userId) {
      query.user = userId 
    }
    if (authorId) {
      query.author =  authorId ;
    }

    const reservations = await ReservationModel.find(query).populate('user').populate('listing');

    return res.status(200).json(reservations);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Houve um erro ao buscar as reservas.' });
  }
};

export const deleteReservation = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params

    const reservation = await ReservationModel.findById(id).populate('user').populate('author')

    const token = getSessionToken(req)
    const user = await getUserBySessionToken(token)

    if(user.id !== reservation.user.id && user.id !== reservation.author.id){
     return res.status(422).json({message: 'Somente o dono da reserva ou da propriedade pode excluir a reserva.'})
    }

    await reservation.deleteOne()
    res.status(200).send(reservation)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao excluir a propriedade."})
  }
}
