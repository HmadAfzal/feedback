import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import CodeBlock from './CodeBlock';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const GetApi = ({ spacename }: { spacename: string }) => {
  const [messageType, setMessageType] = useState('all');
    const [copied, setCopied] = useState(false);
  const baseUrl = `${window.location.protocol}//${window.location.host}`; 
  const query = messageType === 'all' ? 'get-messages' : 'get-likedMessages';
  const url = `${baseUrl}/api/${query}/${spacename}`;


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
<div className='md:px-12 pt-8'>
      <h1 className="md:text-2xl text-xl font-bold my-2">Embed to your site</h1>
      <p className="text-muted-foreground text-sm">Customize your wall of love</p>
      <div className='md:h-[70vh] h-[75vh] w-full rounded-md md:pt-4 pt-2'>
        <div className='w-[80%]'>
          <CodeBlock code={url || '//Something went wrong. Please try again later.'} />
        </div>
        <div className='md:mt-6 mt-4'>
          <h3 className='font-semibold md:text-lg text-md'>Select message type & colors</h3>
          <div className='flex gap-4 my-4'>
            <Button
              onClick={() => setMessageType('all')}
              className={`px-4 py-2 ${messageType === 'all' ? 'bg-primary' : 'bg-muted text-muted-foreground'}`}
            >
              All
            </Button>
            <Button
              onClick={() => setMessageType('liked')}
              className={`px-4 py-2 ${messageType === 'liked' ? 'bg-primary' : 'bg-muted text-muted-foreground'}`}
            >
              Liked
            </Button>
          </div>
        </div>

        <Button onClick={handleCopy} className='my-4'>
          {copied ? <> <ClipboardCheck className="size-4 mr-2" />Copied!</> : <> <Clipboard className="size-4 mr-2" />Copy code</>}
        </Button>
      </div>
    </div>
  );
};

export default GetApi;
