import React, { useRef, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ColorPicker({ label, selectedColor, onColorSelect }: { label: any, selectedColor: any, onColorSelect: any }) {
  const colorInputRef = useRef<HTMLInputElement | null>(null);
  const [color, setColor] = useState<string>(selectedColor?.replace('#', '') || 'ffffff');
  const [inputValue, setInputValue] = useState<string>(color);

  const handleButtonClick = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value.replace('#', '');
    setColor(newColor);
    setInputValue(newColor);
    onColorSelect(newColor);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputColor = event.target.value;

    if (inputColor.startsWith('#')) {
      inputColor = inputColor.slice(1);
    }
    setInputValue(inputColor);

    if (/^[0-9A-F]{6}$/i.test(inputColor)) {
      setColor(inputColor);
      onColorSelect(inputColor);
    }
  };

  return (
    <div>
      <Label className='text-sm font-medium text-muted-foreground'>{label}</Label>
      <div className='flex items-center gap-4 mt-4'>
        <div
          className='h-8 w-8 rounded-full cursor-pointer border'
          style={{ backgroundColor: `#${color}` }}
          onClick={handleButtonClick}
        ></div>
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className='w-28 px-2 py-1 rounded-md text-sm shadow-sm'
        />
        <Input
          type='color'
          ref={colorInputRef}
          value={`#${color}`}
          onChange={handleColorChange}
          className='hidden'
        />
      </div>
    </div>
  );
}
