import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState(null);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    offer: false,
    furnished: false,
    parking: false,
    sort: "createdAt",
    order: "desc",
  });

  console.log(listings);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        offer: offerFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebarData, type: e.target.id });
    }

    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebarData,
        [e.target.id]: e.target.checked,
      });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "createdAt";

      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("parking", sidebarData.parking);
    urlParams.set("furnished", sidebarData.furnished);
    urlParams.set("offer", sidebarData.offer);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);

    const searchquery = urlParams.toString();
    navigate(`/search?${searchquery}`);
  };

  return (
    <div className="flex md:flex-row flex-col">
      <div className="border-b-2 md:border-r-2 p-7 md:h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="flex items-center gap-2">
            <label className="font-semibold whitespace-nowrap">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search ..."
              id="searchTerm"
              className="w-full p-3 rounded-lg outline-none"
              value={sidebarData.searchTerm}
              onChange={handleChange}
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
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="rent"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="sale"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="offer"
                onChange={handleChange}
                checked={sidebarData.offer}
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
                onChange={handleChange}
                checked={sidebarData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex  gap-2">
              <input
                type="checkbox"
                placeholder="Search ..."
                className="w-5 "
                id="parking"
                onChange={handleChange}
                checked={sidebarData.parking}
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
              defaultValue={"createdAt"}
              onChange={handleChange}
            >
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
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
