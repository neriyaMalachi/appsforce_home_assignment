// CardImage.tsx
import Image from "next/image";

interface CardImageProps {
  imageSrc: string;
  altText: string;
}

const CardImage: React.FC<CardImageProps> = ({ imageSrc, altText }) => (
  <Image
    src={imageSrc}
    alt={altText}
    width={120}
    height={120}
    className="rounded-full mx-auto mb-6 border-4 border-gray-100 shadow-md"
  />
);

export default CardImage;
