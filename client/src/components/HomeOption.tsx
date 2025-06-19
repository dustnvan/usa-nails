interface HomeOptionProps {
  text: string;
  onClicked: () => void;
  view: string;
}

const HomeOption = ({ text, onClicked, view }: HomeOptionProps) => {
  const isActive = view === text.toLowerCase();

  return (
    <button
      className={`max-w-48 w-full py-3 rounded-full border border-red cursor-pointer
        ${isActive ? 'bg-red text-white' : 'text-red'}`}
      onClick={onClicked}
    >
      {text}
    </button>
  );
};

export default HomeOption;
