import React, { useState } from 'react'
import { ScrollArea } from '../ui/scroll-area'
import { Badge } from "@/components/ui/badge"
import axios from 'axios';
import CodeBlock from '../CodeBlock';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';

const EmbedToSite = ({ spaceId }: { spaceId: string }) => {
    const [embedCode, setEmbedCode] = useState<string | null>(null);
    const [messageType, setMessageType] = useState('all');
    const [bgColor, setBgColor] = useState('#ffffff');
    const [cardBgColor, setCardBgColor] = useState('#f1f1f1');
    const [textColor, setTextColor] = useState('#000000');
const [loading, setLoading]=useState(false)
    const handleEmbedClick = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`/api/generate-embed-code`, {
                params: {
                    spaceId,
                    type: messageType,
                    bgColor: bgColor.substring(1),
                    cardBgColor: cardBgColor.substring(1),
                    textColor: textColor.substring(1),
                },
            });
            setEmbedCode(response.data.embedCode);
        } catch (error: any) {
            console.error('Error generating embed code:', error);
            toast({
                title:'Error',
                description:'Error in generating embed code',
                variant:'destructive'
            })
        } finally{
            setLoading(false)
        }
    };

    return (
        <div>
            <ScrollArea className='h-[62vh] w-full rounded-md px-12 py-4'>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center font-bold text-4xl p-8'>Embed Feedbacks</h1>

                    <div className='flex w-[100%] items-center gap-8'>
                        <div className=' w-[30%]'>
                            <div className='flex w-full gap-2 justify-start items-center'>
                                <Badge variant="secondary">Step 1</Badge>
                                <h3 className='font-semibold text-xl'>Select message type</h3>
                            </div>
                            <div className='flex gap-4 my-4'>
                                <Button onClick={() => setMessageType('all')} className={`px-4 py-2 ${messageType === 'all' ? 'bg-primary' : 'bg-muted '}`}>All</Button>
                                <Button onClick={() => setMessageType('liked')} className={`px-4 py-2 ${messageType === 'liked' ? 'bg-primary ' : 'bg-muted'}`}>Liked</Button>
                            </div>

                            <div className='flex w-full gap-2 justify-start items-center'>
                                <Badge variant="secondary">Step 2</Badge>
                                <h3 className='font-semibold text-xl'>Pick colors</h3>
                            </div>
                            <div className='flex flex-col gap-4 my-4'>
                                <div className="flex items-center gap-4">
                                    <label className="font-semibold">Background Color:</label>
                                    <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-6 h-6 cursor-pointer p-0 m-0" style={{ backgroundColor: bgColor }} />
                                </div>
                                <div>
                                    <label>Card Background Color: </label>
                                    <input className="w-6 h-6 cursor-pointer p-0 m-0" type='color' value={cardBgColor} onChange={(e) => setCardBgColor(e.target.value)} style={{ backgroundColor: cardBgColor }} />

                                </div>
                                <div>
                                    <label >Text Color: </label>
                                    <input type="color" className="w-6 h-6 cursor-pointer p-0 m-0 border-none outline-none " value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ backgroundColor: textColor }} />
                                </div>
                            </div>
                        </div>

                        <div className=' w-[70%] h-full'><CodeBlock code={embedCode ? embedCode : '//After generation your code will appear here'} /></div>
                    </div>
                    <Button disabled={loading} onClick={handleEmbedClick}>{ loading ?<div className='flex items-center gap-3'><Loader2 className='animate-spin' size={18}/>Generating code for you</div> : 'Generate Code'}</Button>
                </div>

            </ScrollArea>
        </div>
    )
}

export default EmbedToSite;




