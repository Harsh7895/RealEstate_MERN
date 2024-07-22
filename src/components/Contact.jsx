import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [listingOwner, setListingOwner] = useState(null);
  const [message, setmessage] = useState("");
  const userId = listing.userRef;
  useEffect(() => {
    const getListingOwner = async () => {
      try {
        const res = await fetch(`/api/user/${userId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
        setListingOwner(data);
      } catch (error) {
        console.log(error);
      }
    };
    getListingOwner();
  }, [listing]);

  return (
    <>
      {listingOwner && listing && (
        <div className="flex gap-3 flex-col mt-4">
          <p>
            Contact <span className="font-bold">{listingOwner.username}</span>{" "}
            for <span className="font-bold">{listing.name}</span>
          </p>

          <textarea
            placeholder="Enter your message here..."
            className="p-3 h-32 rounded-lg outline-none"
            onChange={(e) => setmessage(e.target.value)}
            value={message}
          ></textarea>
          <Link
            className="bg-slate-700 text-white uppercase p-3 hover:opacity-90 rounded-lg w-full text-center"
            to={`mailto:${listingOwner.email}?subject=Regarding${listing.name}&body=${message}`}
          >
            Send message
          </Link>
        </div>
      )}
    </>
  );
}
