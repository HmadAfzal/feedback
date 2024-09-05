import React, { useState } from 'react';
import ColorPicker from '@/components/ColorPicker';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import CodeBlock from './CodeBlock';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck } from 'lucide-react';

const EmbedToSite = ({ spaceId }: { spaceId: string }) => {
  const [backgroundColor, setBackgroundColor] = useState('ffffff');
  const [cardColor, setCardColor] = useState('f1f1f1');
  const [textColor, setTextColor] = useState('000000');
  const [hideDate, setHideDate] = useState(false);
  const [sameHeight, setSameHeight] = useState(false);
  const [enableShadow, setEnableShadow] = useState(false);
  const [messageType, setMessageType] = useState('all');
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleCheckboxChange = (setter: React.Dispatch<React.SetStateAction<boolean>>) => (checked: boolean | 'indeterminate') => {
    if (typeof checked === 'boolean') {
      setter(checked);
    }
  };

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const iframeSrc = `${baseUrl}/embed/${spaceId}?type=${messageType}&bgColor=${encodeURIComponent(backgroundColor.slice(1))}&cardBgColor=${encodeURIComponent(cardColor.slice(1))}&textColor=${encodeURIComponent(textColor.slice(1))}&hideDate=${hideDate}&sameHeight=${sameHeight}&enableShadow=${enableShadow}`;
  
  const embedCode = `
  <iframe id="embed-${spaceId}"
  src="${iframeSrc}" frameborder="0" scrolling="no" width="100%"></iframe>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/4.3.2/iframeResizer.min.js"></script>
  <script type="text/javascript">iFrameResize({ log: false, checkOrigin: false },'#embed-${spaceId}');</script>
  `;

  return (
    <div className='md:px-12 pt-8'>
      <h1 className="md:text-2xl text-xl font-bold my-2">Embed to your site</h1>
      <p className="text-muted-foreground text-sm">Customize your wall of love</p>
      <ScrollArea className='md:h-[70vh] h-[75vh] w-full rounded-md md:pt-4 pt-2'>
        <div className='w-[80%]'>
          <CodeBlock code={embedCode || '//Something went wrong. Please try again later.'} />
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
        <div className='flex md:flex-row flex-col md:items-center md:gap-8 gap-4 mt-6'>
          <ColorPicker label="Background color" selectedColor={backgroundColor} onColorSelect={setBackgroundColor} />
          <ColorPicker label="Card color" selectedColor={cardColor} onColorSelect={setCardColor} />
          <ColorPicker label="Text color" selectedColor={textColor} onColorSelect={setTextColor} />
        </div>
        <div className="space-y-4 mt-8">
          <h3 className='font-semibold  md:text-lg text-md'>More customizations</h3>
          <div className="flex items-center space-x-2 ">
            <Checkbox id="hideDate" checked={hideDate} onCheckedChange={handleCheckboxChange(setHideDate)} />
            <Label htmlFor="hideDate" className="text-sm font-medium">
              Hide Date
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="sameHeight" checked={sameHeight} onCheckedChange={handleCheckboxChange(setSameHeight)} />
            <Label htmlFor="sameHeight" className="text-sm font-medium">
              Same height for all texts
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="enableShadow" checked={enableShadow} onCheckedChange={handleCheckboxChange(setEnableShadow)} />
            <Label htmlFor="enableShadow" className="text-sm font-medium">
              Enable shadow
            </Label>
          </div>
        </div>
        <Button onClick={handleCopy} className='my-4'>
          {copied ? <> <ClipboardCheck className="size-4 mr-2" />Copied!</> : <> <Clipboard className="size-4 mr-2" />Copy code</>}
        </Button>
      </ScrollArea>
    </div>
  );
};

export default EmbedToSite;
