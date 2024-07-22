import Image from "next/image";
import {
  IoLocationOutline,
  IoCallOutline,
  IoMailOutline,
} from "react-icons/io5";

interface Property {
  _id: string;
  title: string;
  price: number;
  location: string;
  image: string[];
  purpose: string;
  propertyType: string;
  area: number;
}

interface PropertyDetailsProps {
  property: Property;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ property }) => {
  const formatNumber = (num: number) => num.toLocaleString();

  return (
    <section className="mx-auto max-w-screen-lg text-white mt-6 mb-3">
      <h2 className="text-3xl font-bold text-gradient">{property.title}</h2>
      <div className="bg-white mb-4 mt-4 lg:mb-16 bg-black shadow-md p-4 rounded-xl bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
        <div className="property-slider-image">
          {property.image.length > 0 ? (
            <Image
              src={property.image[0]}
              alt={property.title}
              width={800}
              height={600}
            />
          ) : (
            <div className="no-image-placeholder">No Image Available</div>
          )}
        </div>
        <div>
          <div className="mt-2 text-sm text-gradient">
            AED{" "}
            <span className="text-xl font-bold">
              {formatNumber(property.price)}
            </span>
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-400">
            <div className="capitalize">{property.propertyType}</div>
            <span className="mx-2">|</span>
            <div className="mx-2 capitalize">{property.purpose}</div>
            <span className="mx-2">|</span>
            <div>Area: {formatNumber(property.area)} sq. ft.</div>
          </div>
          <div className="text-xl font-bold mt-4">{property.title}</div>
          <div className="flex items-center mt-2 max-w-full overflow-hidden">
            <IoLocationOutline className="mr-2 text-2xl" />
            <div className="text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
              {property.location}
            </div>
          </div>
        </div>
        {/* Contact Icons Section */}
        <div className="flex items-center justify-center mt-4">
          <a
            href={`tel:#`}
            className="shiny-btn p-2 font-bold flex items-center mr-4"
          >
            <IoCallOutline className="text-2xl" />
            <span className="ml-1">Call</span>
          </a>
          <a
            href={`mailto:#`}
            className="shiny-btn p-2 font-bold flex items-center mr-4"
          >
            <IoMailOutline className="text-2xl" />
            <span className="ml-1">Mail</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;
