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

export default async function Home(searchParams: IParams) {
  const listings = await getListings(searchParams.searchParams);

  if (listings.length === 0) {
    return <EmptyState showReset />;
  }

  return (
    <Container>
      <div className=" pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => {
          return <ListingCard data={listing} key={listing.id} />;
        })}
      </div>
    </Container>
  );
}
