"use client";

import { getListingComments } from "@/app/actions/getListingComments";
import CommentsSection from "@/app/components/commentsSection/CommentsSection";
import Container from "@/app/components/container/Container";
import ListingHead from "@/app/components/listingHead/ListingHead";
import ListingInfo from "@/app/components/listingInfo/ListingInfo";
import ListingReservation from "@/app/components/listingReservation/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/useLoginModal";
import useUserAuth from "@/app/hooks/useUserAuth";
import { IComment, SafeUser, safeListing, safeReservation } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { toast } from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: safeReservation[];
  listing: safeListing & { user: SafeUser };
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [comments, setComments] = useState<IComment[]>([]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const userAuth = useUserAuth();
  const currentUser = userAuth.currentUser;

  const onCreateReservation = async () => {
    if (!currentUser) return loginModal.onOpen();

    setIsLoading(true);
    try {
      await axios.post("http://localhost:4000/reservations", {
        totalPrice,
        userId: currentUser.id,
        authorId: listing.user.id,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      });
      toast.success("Reservado com sucesso.");
      setDateRange(initialDateRange);
      router.refresh();
      router.push("/trips");
    } catch (error) {
      console.error(error);
      toast.error("Ops... Houve um erro ao fazer a reserva.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!dateRange.startDate || !dateRange.endDate) return;
    if (dateRange.startDate === dateRange.endDate)
      return setTotalPrice(listing.price);

    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );

    if (dayCount && listing.price) {
      setTotalPrice(dayCount * listing.price);
    }
  }, [dateRange, listing.price]);

  useEffect(() => {
    const getComments = async () => {
      const data = await getListingComments(listing?.id);
      setComments(data as IComment[]);
    };
    getComments();
  }, [listing]);

  const category = categories.find(
    (category) => category.label === listing.category
  );

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.images[0]}
            locationValue={listing.locationValue}
            id={listing.id}
          />
          <div className="md:grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:col-span-3 md:order-4 md:px-4 max-md:mt-8">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
            <div className="grid mt-6 !col-span-7 md:order-last">
              <CommentsSection data={comments} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
