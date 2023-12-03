function Wishlists() {
  return (
    <section className="py-12 px-24 flex flex-col gap-12">
      <h1 className="font-semibold text-4xl">Wishlists</h1>
      {/* <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-8"></div> */}
      <div className="flex flex-col gap-4">
        <span className="font-semibold text-xl">
          {" "}
          Create your first wishlist
        </span>
        <span className="font-medium text-gray-600">
          As you search, click the heart icon to save your favorite places and
          Experiences to a wishlist.
        </span>
      </div>
    </section>
  );
}

export default Wishlists;
