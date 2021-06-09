function HeaderIcon({ Icon, active }) {
  return (
    <div className="group cursor-pointer md:px-10 sm:h-14 rounded-xl items-center flex md:hover:bg-gray-100">
      <Icon
        className={` text-center sm:h-7 mx-auto  group-hover:text-blue-500 h-5 active:border-b-2 active:border-blue-500 
        hover:text-blue-500 ${active ? "text-blue-500" : "text-gray-500"}`}
      />
    </div>
  );
}

export default HeaderIcon;
