import React, { FC, useRef, FocusEvent } from 'react';
import { IoSearchOutline } from 'react-icons/io5';

interface SearchBoxProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const SearchBox: FC<SearchBoxProps> = () => {
  const box = useRef<HTMLDivElement>(null);
  const icon = useRef<HTMLDivElement>(null);

  const handleFocusEvent = (e: FocusEvent<HTMLInputElement>) => {
    console.log(box.current);
    box.current?.classList.replace('border-accent', 'border-primary');
    box.current?.classList.replace('bg-accent', 'bg-white');
    icon.current?.classList.add('text-primary');
  };
  const handleBlurEvent = (e: FocusEvent<HTMLInputElement>) => {
    console.log(box.current?.className);
    // box.current?.classList.remove('border-primary');
    // box.current?.classList.add('border-accent');
    box.current?.classList.replace('border-primary', 'border-accent');
    box.current?.classList.replace('bg-white', 'bg-accent');
    icon.current?.classList.remove('text-primary');
  };
  return (
    <div
      ref={box}
      className="bg-accent border-2 border-accent rounded-3xl flex items-center "
    >
      <div ref={icon}>
        <IoSearchOutline className="w-6 h-6 m-2" />
      </div>
      <input
        className="bg-transparent text-left border-0 flex-grow rounded-none"
        type="text"
        name="search"
        id="search"
        placeholder="Search Twitter"
        onFocus={handleFocusEvent}
        onBlur={handleBlurEvent}
      />
    </div>
  );
};

export default SearchBox;
