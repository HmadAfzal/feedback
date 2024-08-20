import React, { useState } from 'react';
import { Button } from '../ui/button';
import axios from 'axios';

const EmbedToSite = ({ spaceId }: { spaceId: string }) => {
    const [embedCode, setEmbedCode] = useState<string | null>(null);

    const handleEmbedClick = async () => {
        try {
            const response = await axios.get(`/api/generate-embed-code?spaceId=${spaceId}`);
            setEmbedCode(response.data.embedCode);
        } catch (error) {
            console.error('Error generating embed code:', error);
        }
    };

    return (
        <div className='w-full flex flex-col justify-center items-center my-20'>
            <Button onClick={handleEmbedClick}>Embed to your site</Button>
            {embedCode && (
                <textarea
                    readOnly
                    value={embedCode}
                    className='mt-4 p-2 border border-gray-300 rounded'
                    rows={5}
                    cols={50}
                />
            )}
        </div>
    );
};

export default EmbedToSite;
