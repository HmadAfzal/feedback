'use client'

import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFirstName } from '@/utils/getfirstname';
import { Separator } from '@/components/ui/separator';
import { Loader2, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSpaces, selectSpaces } from '@/redux/spaceslice';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";
import { Space } from '@/schemas/Space';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { buttonVariants } from '@/components/ui/button';
import SingleSpace from './SingleSpace';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { cn } from '@/lib/utils';

const Dashboard = () => {
  const spaces = useAppSelector(getSpaces) || [];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = spaces.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(spaces.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data: session, status } = useSession();
  const user = session?.user;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSpaces = async () => {
      try {
        const response = await axios.get('/api/get-spaces');
        dispatch(selectSpaces(response?.data.spaces));
      } catch (error) {
        console.log(error);
      }
    };
    getSpaces();
  }, [dispatch, session]);

  if (status === 'loading') {
    return (
      <div className='w-full flex items-center justify-center py-40'>
        <Loader2 className='animate-spin w-12 h-12 text-[#EA580C]' />
      </div>
    );
  }

  return (
    <>
      <div className='flex items-center justify-start gap-5 my-16'>
        <Avatar className='md:h-24 md:w-24 h-20 w-20'>
          <AvatarImage src={user?.profilepic} />
          <AvatarFallback>{user?.name[0]}</AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-3xl md:text-4xl'>Welcome, {getFirstName(user?.username || '')}</h1>
          <p className='md:text-md text-sm text-muted-foreground tracking-wide'>
            Let&apos;s get productive—your dashboard is ready.
          </p>
        </div>
      </div>
      <Separator className="my-12" />
      <div className='w-full flex items-center justify-between mb-6'>
        <h2 className='font-bold text-2xl md:text-3xl'>Spaces</h2>
        <Link
          href={'/create-space'}
          className={cn(buttonVariants({ variant: "default" }), 'flex items-center justify-center')}
        >
          <Rocket className='mr-2 size-4' />
          Create Space
        </Link>
      </div>
      {currentItems && currentItems.length > 0 ? (
        currentItems.map((space: Space) => (
          <Link href={`space/${space?.name}`} key={space?._id}>
            <SingleSpace space={space} />
          </Link>
        ))
      ) : (
        <div className='h-[40vh]'>
          <DotLottieReact
            src="https://lottie.host/87e53e15-91fb-4670-b307-5eeccaf4a8e9/q1dZxDTPew.json"
            loop
            autoplay
          />
          <p className='text-center text-lg font-semibold text-neutral-800 dark:text-neutral-500'>
            No spaces yet, create one?
          </p>
        </div>
      )}
      {spaces.length > itemsPerPage && (
        <Pagination className='pt-4 pb-12'>
          <PaginationContent>
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
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default Dashboard;
