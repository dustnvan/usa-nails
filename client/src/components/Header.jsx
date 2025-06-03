const Header = () => {
  return (
    <header className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">
        <span className="text-blue">USA</span>
        <span className="text-red ml-2">Nails</span>
      </h1>
      <h2 className="text-xl">
        <a href="tel:6622740527">(662) 274-0527</a>
      </h2>
      <h2 className="mt-1">117 S Craft St</h2>
    </header>
  );
};
export default Header;
