import ImageGallery from "../ImageGallery/ImageGallery"
import './gallery.css'
import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "../skeleton/skeleton";



const fetchPins = async ({ pageParam, search, userId, boardId }) => {
  const res = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/pins`, {
    params: {
      cursor: pageParam,
      search: search || "",
      userId: userId || "",
      boardId: boardId || ""
    }
  });
  return res.data;
};



const Gallery = ({ search, userId, boardId }) => {

  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    // queryKey: ['pins'],
    queryKey: ['pins', search, userId, boardId],
    queryFn: ({ pageParam = 0 }) =>
      fetchPins({ pageParam, search, userId, boardId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  });

  if (status === "pending") return <Skeleton />;
  if (status === "error") return "Something went wrong...";

  const allPins = data?.pages.flatMap((page) => page.pins) || [];

  return (
    <InfiniteScroll
      dataLength={allPins.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h1>Loading more pins</h1>}
      endMessage={<h3 className="allpostloaded"></h3>}
    >
      <div className="gallery">
        {allPins?.map((item) => (
          <ImageGallery key={item._id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  )
}

export default Gallery