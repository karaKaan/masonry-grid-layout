import { Link, useParams } from "react-router-dom";
import { unsplash } from "../../utils/unsplash";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import * as S from "./PhotoDetail.styled";
import { ChevronLeftCircle } from "../Icons/ChevronLeftCircle";

type PhotoDetailProps = {};
interface PhotoDetailInterface {
  fullUrl: string;
  title: string;
  description: string;
  author: string;
  dateTaken: string;
}

const PhotoDetail = (props: PhotoDetailProps) => {
  const { id } = useParams();
  const [photoDetails, setPhotoDetails] = useState<PhotoDetailInterface>();

  const NO_DATA_AVAILABLE = "No data available";

  useEffect(() => {
    const getPhotoById = async (photoId: string) => {
      const photoResponse = (await unsplash.photos.get({ photoId })).response;
      // title, description and dateTaken is not available in the api. I had to use alternatives for it.
      setPhotoDetails({
        fullUrl: photoResponse?.urls.full ?? NO_DATA_AVAILABLE,
        title: photoResponse?.description ?? NO_DATA_AVAILABLE,
        description: photoResponse?.alt_description ?? NO_DATA_AVAILABLE,
        author: photoResponse?.user.name ?? NO_DATA_AVAILABLE,
        dateTaken: photoResponse?.created_at
          ? dayjs(photoResponse?.created_at).format("DD MMM. YYYY")
          : NO_DATA_AVAILABLE,
      });
    };
    if (id) getPhotoById(id);
  }, [id]);
  return (
    <S.PhotoDetailContainer>
      <Link to="/" className="chevron-left-link">
        <ChevronLeftCircle />
      </Link>
      <S.ImageAndContentWrapper>
        <S.ImageWrapper>
          <img src={photoDetails?.fullUrl} alt={photoDetails?.description} />
        </S.ImageWrapper>
        <S.ContentWrapper>
          <S.TopContentSection>
            <p>{photoDetails?.author}</p>
            <p>{photoDetails?.dateTaken}</p>
          </S.TopContentSection>
          <S.PhotoTitle>{photoDetails?.title}</S.PhotoTitle>
          <S.PhotoDescription>{photoDetails?.description}</S.PhotoDescription>
        </S.ContentWrapper>
      </S.ImageAndContentWrapper>
    </S.PhotoDetailContainer>
  );
};

export default PhotoDetail;
