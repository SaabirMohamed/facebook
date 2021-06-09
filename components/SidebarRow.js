import Image from "next/image";
const SidebarRow = ({ Icon, title, src }) => {
  return (
    <div className="flex items-center space-x-2 p-1 hover:bg-gray-200 rounded-full cursor-pointer">
      {src && <Image width={30} height={30} layout="fixed" src={src} />}
      {Icon && <Icon className="h-8 w-8 text-blue-500" />}
      <p className=" font-medium hidden sm:inline-flex text-gray-600">
        {title}
      </p>
    </div>
  );
};
export default SidebarRow;
