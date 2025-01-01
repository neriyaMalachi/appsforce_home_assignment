// CardDetails.tsx
interface CardDetailsProps {
    name: string;
    email: string;
    location: string;
    street: string;
    uuid: string;
  }
  
  const CardDetails: React.FC<CardDetailsProps> = ({
    name,
    email,
    location,
    street,
    uuid
  }) => (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">
        {name}
      </h2>
      <p className="text-center text-sm text-blue-500 mb-1">{email}</p>
      <p className="text-center text-sm text-gray-500 mb-2">{location} - {street}</p>
      <p className="text-center text-xs text-gray-400">UUID: {uuid}</p>
    </div>
  );
  
  export default CardDetails;
  