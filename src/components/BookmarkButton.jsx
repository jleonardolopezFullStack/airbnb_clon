"use client";
import bookmarkProperty from "@/app/actions/bookmarkProperty";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import findBookmarks from "@/app/actions/findBookmarks";

const BookmarkButton = ({ property }) => {
  const { data: session, status, update } = useSession();
  const [faIcon, setFaIcon] = useState(false);
  const [bookmarks, setBookmarks] = useState(null);

  const handleClick = async () => {
    if (!session.user.id) {
      toast.error("You need to be signed in to bookmark a listing");
    }
    try {
      const response = await bookmarkProperty(property._id);
      console.log(response);

      if (response.bookmarkId.includes(property._id.toString())) {
        console.log("API Response:", response.bookmarkId);
        setFaIcon(true);
        // console.log(property._id);
      } else {
        setFaIcon(false);
      }
    } catch (error) {
      console.error("Error bookmarking property:", error);
    }
  };

  useEffect(() => {
    async function fetchingBookmark() {
      const findingFirstBookmarks = await findBookmarks(property._id);
      findingFirstBookmarks.success ? setBookmarks(true) : setBookmarks(false);
    }
    fetchingBookmark();
  }, [property]);

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    >
      {faIcon || bookmarks ? (
        <FaBookmark className="mr-2 text-red-600" />
      ) : (
        <FaBookmark className="mr-2 text-blue-600" />
      )}
      Bookmark Property
    </button>
  );
};

export default BookmarkButton;
