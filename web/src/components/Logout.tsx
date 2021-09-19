import { useQuery } from '@apollo/client';
import React, { FC } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ME_QUERY } from '../pages/Profile';
import { createPopper } from '@popperjs/core';
import { createRef } from 'react';
import { FaCheck, FaEllipsisH } from 'react-icons/fa';
import Loading from './Loading';
import { IoPersonCircleOutline } from 'react-icons/io5';

interface LogoutProps {
  className?: string;
  chidlren?: React.ReactNode;
}

const Logout: FC<LogoutProps> = ({ className }) => {
  const history = useHistory();
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = createRef<HTMLButtonElement>();
  const popoverDropdownRef = createRef<HTMLDivElement>();

  const { loading, error, data } = useQuery(ME_QUERY);
  if (loading) return <Loading />;
  if (error) return <h3>{error.message}</h3>;

  const handleLogout = async () => {
    localStorage.removeItem('token');
    history.push('login');
  };

  const openDropdownPopover = () => {
    createPopper(
      btnDropdownRef.current as HTMLButtonElement,
      popoverDropdownRef.current as HTMLDivElement,
      {
        placement: 'top',
      },
    );
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  return (
    <>
      <div className={className}>
        <div className="relative inline-flex align-middle w-fulls">
          <button
            className="flex hover:bg-accent rounded-full p-2 items-center
              space-x-3"
            ref={btnDropdownRef}
            onClick={() => {
              dropdownPopoverShow
                ? closeDropdownPopover()
                : openDropdownPopover();
            }}
          >
            {data?.me.profile && data?.me.profile.avatar ? (
              <img
                src={data.me.profile.avatar}
                className="max-h-10 rounded-full"
                alt="avatar"
              />
            ) : (
              <IoPersonCircleOutline className="inline w-14 h-14" />
            )}
            <h3 className="font-bold hidden lg:inline">{data?.me.name}</h3>
            <FaEllipsisH className=" mr-3 hidden lg:inline" />
          </button>
          <div
            ref={popoverDropdownRef}
            className={`
                ${dropdownPopoverShow ? 'block ' : 'hidden '}
                text-base z-50 float-left list-none text-left 
                rounded-xl shadow-2 drop-shadow-2xl pb-2
                 `}
            style={{ minWidth: '12rem' }}
          >
            <div className="flex p-4 items-center">
              {data?.me.profile && data?.me.profile.avatar ? (
                <img
                  src={data.me.profile.avatar}
                  className="max-h-10 rounded-full"
                  alt="avatar"
                />
              ) : (
                <IoPersonCircleOutline className="inline w-14 h-14" />
              )}
              <h3 className="font-bold ml-2">{data?.me.name}</h3>
              <FaCheck className="inline ml-auto text-primary" />
            </div>
            <div
              className="h-0 border border-solid border-t-0
                border-blueGray-800 "
            />
            <a
              href="#pablo"
              className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-accent"
              onClick={(e) => e.preventDefault()}
            >
              Add an existing account
            </a>
            <a
              href="#pablo"
              className="text-sm py-3 px-4 font-normal block w-full 
                  whitespace-nowrap hover:bg-accent"
              onClick={handleLogout}
            >
              {`Log out @${data?.me.name}${data?.me.id}`}
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Logout;
