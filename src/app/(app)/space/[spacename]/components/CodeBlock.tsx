import React, { useState } from 'react';
import { Copy } from 'lucide-react'; // Importing an icon for the copy button
import { Button } from '@/components/ui/button';

const CodeBlock = ({ code }: { code: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); 
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

    return (
        <div className="relative w-full bg-card text-card-foreground p-6 rounded-lg shadow-md">
            <pre className="overflow-x-auto whitespace-pre-wrap text-sm font-mono w-full">
                <code>{code}</code>
            </pre>
            <Button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 bg-muted hover:bg-primary transition-all text-primary-foreground rounded-lg"
                variant="ghost"
                size="sm"
            >
                {copied ? "Copied!" : <Copy size={16} />}
            </Button>
        </div>
    );
};

export default CodeBlock;
