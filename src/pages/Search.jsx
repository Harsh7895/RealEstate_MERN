export default function Search() {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="border-b-2 md:border-r-2 p-7 md:h-screen">
        <form className="flex flex-col">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search ..."
              className="w-full p-3 rounded-lg outline-none"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap py-4">
            <label className="font-semibold whitespace-nowrap">Type:</label>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="all"
              />
              <span>Rent & Sale</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="rent"
              />
              <span>Rent</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="sale"
              />
              <span>Sale</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="offer"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap py-4">
            <label className="font-semibold whitespace-nowrap">
              Amenities:
            </label>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="furnished"
              />
              <span>Furnished</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="parking"
              />
              <span>Parking</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">Sort:</label>
            <select
              name="sort_order"
              id="sort_order"
              className="p-3 rounded-lg border-2 px-4"
            >
              <option value="">Latest</option>
              <option value="">Oldest</option>
              <option value="">Price high to low</option>
              <option value="">Price low to high</option>
            </select>
          </div>

          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 mt-8">
            Search
          </button>
        </form>
      </div>
      <div>
        <h1 className="font-semibold text-3xl mt-4 p-4">Listing Results:</h1>
      </div>
    </div>
  );
}
