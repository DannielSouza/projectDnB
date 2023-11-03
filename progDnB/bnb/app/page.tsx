import { Metadata } from "next";
import getListings, { IListingsParams } from "./actions/getListings";
import Container from "./components/container/Container";
import EmptyState from "./components/emptyState/EmptyState";
import ListingCard from "./components/listingCard/ListingCard";

interface IParams {
  searchParams: {
    userId?: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: number;
    category: string;
    startDate: string;
    endDate: string;
  };
}

export const metadata: Metadata = {
  title: "DnB | Inicio",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/dnbIcon2.svg",
        href: "/images/dnbIcon2.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/dnbIcon2.svg",
        href: "/images/dnbIcon2.svg",
      },
    ],
  },
};

export default async function Home(searchParams: IParams) {
  const listings = await getListings(searchParams.searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className="pt-24 flex flex-wrap gap-8 max-sm:justify-center">
        {listings.map((listing: any) => {
          return <ListingCard data={listing} key={listing.id} />;
        })}
      </div>
    </Container>
  );
}
