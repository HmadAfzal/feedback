'use client'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getFirstName } from '@/utils/getfirstname';
import { Separator } from '@/components/ui/separator';
import { Link2, Rocket, Settings } from 'lucide-react';
import { Session } from '@/schemas/Session';
import { Button } from '../ui/button';
import Nav from '../nav/Nav';
import Link from 'next/link';
import { useAppSelector } from '@/redux/hooks';
import { getSpaces } from '@/redux/spaceslice';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Space } from '@/schemas/Space';

const Dashboard = ({ user, setCreateSpace }: { user: Session, setCreateSpace: (value: boolean) => void }) => {
  const spaces = useAppSelector(getSpaces) || [];
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spaces.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(spaces.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Nav />
      <div className='flex items-center justify-start gap-5 mt-16'>
        <Avatar className='h-32 w-32'>
          <AvatarImage src={user?.profilepic} />
          <AvatarFallback>pf</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-5xl'>{getFirstName(user?.username || '')}&apos;s Dashboard</h1>
          <p className='font-normal text-lg'>{user?.email}</p>
        </div>
      </div>
      <Separator className="my-12" />
      <div className='w-full flex items-center justify-between mb-6'>
        <h2 className='font-bold text-3xl'>Spaces</h2>
        <Button className='flex items-center justify-between gap-3' onClick={() => setCreateSpace(true)}>
          <Rocket size={20} /> Create Space
        </Button>
      </div>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((space: Space) => (
          <div key={space?._id} className='shadow-lg hover:shadow-sm transition-all w-full dark:bg-neutral-800 bg-neutral-200 rounded-lg px-6 py-5 my-6 flex justify-between'>
            <div className='flex items-center gap-6'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src={space?.image} />
                <AvatarFallback>pf</AvatarFallback>
              </Avatar>
              <div>
                <h3 className='font-bold text-xl pb-2'>{space?.name}</h3>
                <div className='flex items-center gap-2 text-md dark:text-neutral-400 text-neutral-700 hover:underline'>
                  <Link2 />
                  <Link href={`${baseUrl}/u/${space?.name}`}>{baseUrl}/u/{space?.name}</Link>
                </div>
              </div>
            </div>
            <div className='cursor-pointer dark:text-neutral-400 text-neutral-700'>
              <Settings size={22} />
            </div>
          </div>
        ))
      ) : (
        <p className='text-center py-20 text-xl font-semibold '>No space yet, create a new one?</p>
      )}
      {spaces.length > itemsPerPage && (
        <Pagination className='pt-4 pb-12'>
          <PaginationContent>
            <PaginationItem>
              {currentPage > 1 && (
                <PaginationPrevious
                className='cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              )}
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  className='cursor-pointer'
                  isActive={currentPage === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  className='cursor-pointer'
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default Dashboard;
