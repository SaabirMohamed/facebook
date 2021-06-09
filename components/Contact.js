import Image from "next/image";
const Contact = ({ src, name }) => {
  return (
    <div className="flex items-center space-x-3 mb-2 relative hover:text-gray-200 rounded-xl cursor-pointer p-2">
      <Image
        className="rounded-full"
        src={src}
        width={50}
        height={50}
        layout="fixed"
        objectFit="cover"
      />
      <p className="text-gray-400">{name}</p>
      <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full shadow-md animate-pulse"></div>
    </div>
  );
};

export default Contact;
