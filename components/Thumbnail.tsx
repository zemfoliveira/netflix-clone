import { Movie } from "@/typings";
import Image from "next/image";

interface ThumbnailProps {
  movie: Movie; // | DocumentData[];
}

function Thumbnail({ movie }: ThumbnailProps) {
  return (
    <div className="relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105">
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt="Thumbnail"
        className="rounded-sm object-cover md:rounded"
        draggable={false}
        fill
      />
    </div>
  );
}

export default Thumbnail;
