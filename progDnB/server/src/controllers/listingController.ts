import express from "express"
import { ListingModel, getListingById } from "../models/listing"
import { getUserById, getUserBySessionToken } from "../models/users"
import { ReservationModel } from "../models/reservation"
import { getSessionToken } from "../middlewares/getSessionToken"

export const create = async (req: express.Request, res: express.Response) => {
  try {
    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
      userId
    } = req.body

    if(!title) return res.status(422).json({message: 'O titulo é obrigatório.'})
    if(!description) return res.status(422).json({message: 'A descrição é obrigatória.'})
    if(!imageSrc) return res.status(422).json({message: 'A imagem é obrigatória.'})
    if(!category) return res.status(422).json({message: 'A categoria de senha é obrigatório.'})
    if(!roomCount) return res.status(422).json({message: 'A quantidade de quartos é obrigatória.'})
    if(!bathroomCount) return res.status(422).json({message: 'A quantidade de banheiros é obrigatória.'})
    if(!guestCount) return res.status(422).json({message: 'A quantidade de hóspedes é obrigatória.'})
    if(!location) return res.status(422).json({message: 'O local é obrigatório.'})
    if(!price) return res.status(422).json({message: 'O preço é obrigatório.'})
    if(!userId) return res.status(422).json({message: 'O id do usuário é obrigatório.'})

    const newListing = await ListingModel.create({
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location,
      price,
      user: userId
    })
    return res.status(201).send(newListing)    
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao criar a propriedade."})
  }
}

export const getAllUsersListings = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const listings = await ListingModel.find({user: id}).populate('user');
    return res.status(200).send(listings)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao buscar a propriedade desse usuário."})
  }
}

export const getListing = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params
    const listing = await getListingById(id).populate('user');
    res.status(200).send(listing)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao buscar esta propriedade."})
  }
}

export const getListings = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      category,
      startDate,
      endDate,
    } = req.query; 

    let query: any = {};

    if (userId) {
      query.user = userId;
    }
    if (roomCount) {
      query.roomCount = { $gte: Number(roomCount) };
    }
    if (guestCount) {
      query.guestCount = { $gte: Number(guestCount) };
    }
    if (bathroomCount) {
      query.bathroomCount = { $gte: Number(bathroomCount) };
    }
    if (locationValue) {
      query.locationValue = locationValue;
    }
    if (category) {
      query.category = category;
    }
  
    const matchingReservations = await ReservationModel.find({
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    const matchingReservationIds = matchingReservations.map((reservation) => reservation._id);

    if (matchingReservationIds.length > 0) {
      query.reservations = { $not: { $in: matchingReservationIds } };
    }

    const listing = await ListingModel.find(query).populate('user').exec();
    res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Houve um erro ao buscar esta propriedade.' });
  }
};

export const deleteListing = async (req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params
    const listing = await ListingModel.findById(id).populate('user')

    const token = getSessionToken(req)
    const user = await getUserBySessionToken(token)

    if(user.id !== listing.user.id){
     return res.status(422).json({message: 'Somente o dono da propriedade pode a excluir.'})
    }

    await listing.deleteOne()
    res.status(200).send(listing)
  } catch (error) {
    console.log(error)
    res.status(400).json({message: "Houve um erro ao excluir a propriedade."})
  }
}

export const getFavoriteListings = async (req: express.Request, res: express.Response) => {
  const { id } = req.params;
  if (!id) res.status(400).json({ message: "O id do usuário é obrigatório." });

  const user = await getUserById(id);
  if (!user) res.status(404).json({ message: "Usuário não encontrado." });

  const favoriteListings: any = [];

  for (const favoriteId of user.favoriteIds) {
    try {
      const currentFavorite = await getListingById(favoriteId);
      if(currentFavorite) favoriteListings.push(currentFavorite);
    } catch (error) {
      console.error(`Houve um erro ao procurar a propriedade com o id ${favoriteId}`);
    }
  }

  res.status(200).send(favoriteListings);
}