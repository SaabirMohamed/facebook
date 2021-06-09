import Image from "next/image";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  SearchIcon,
  PlayIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useSession, signout } from "next-auth/client";
function Header() {
  const [session] = useSession();
  return (
    <div className=" flex mx-5 items-center justify-between sticky top-0 z-50">
      <div className="flex">
        <Image
          width={40}
          height={40}
          src="https://links.papareact.com/5me"
          layout="fixed"
        />
        <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2">
          {/* icon */}
          <SearchIcon className="h-6 text-gray-600" />
          {/* input field */}
          <input
            className="hidden md:inline-flex flex-shrink ml-2 bg-transparent outline-none placeholder-gray-500"
            placeholder="search facebook"
            type="text"
          />
        </div>
      </div>
      <div>
        <div className="flex justify-center flex-grow">
          <div className="flex space-x-6 md:space-x-2">
            <HeaderIcon active Icon={HomeIcon} />
            <HeaderIcon Icon={FlagIcon} />
            <HeaderIcon Icon={PlayIcon} />
            <HeaderIcon Icon={ShoppingCartIcon} />
            <HeaderIcon Icon={UserGroupIcon} />
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center sm:space-x-3 justify-end ">
          <Image
            className="rounded-full cursor-pointer "
            width={40}
            height={40}
            src={session.user.image}
            layout="fixed"
            onClick={signout}
          />
          <p className="space-x-2 pr-3 whitespace-nowrap font-semibold">
            {session.user.name}
          </p>
          <ViewGridIcon className="icon h-8" />
          <BellIcon className="icon h-8" />
          <ChevronDownIcon className="icon h-8" />
        </div>
      </div>
    </div>
  );
}

export default Header;
