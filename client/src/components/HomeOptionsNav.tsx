import HomeOption from './HomeOption';

interface HomeOptionsNavProps {
  view: string;
  setView: (view: string) => void;
}

const HomeOptionsNav = ({ view, setView }: HomeOptionsNavProps) => {
  return (
    <nav className="flex justify-center gap-2 mt-6">
      <HomeOption
        text="Service"
        onClicked={() => setView('service')}
        view={view}
      />
      <HomeOption text="Staff" onClicked={() => setView('staff')} view={view} />
    </nav>
  );
};
export default HomeOptionsNav;
