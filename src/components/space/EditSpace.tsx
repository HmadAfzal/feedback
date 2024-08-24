import React, { useState } from 'react'
import { Session } from '@/schemas/Session'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Moon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import CustomUploadButton from '../CustomUploadButton';
import { Space, SpaceSchema } from '@/schemas/Space';
import EditSpacePreview from './EditSpacePreview';
import { useSession } from 'next-auth/react';

const EditSpace = ({ setEditSpace, space}:{setEditSpace:(value:boolean)=>void, space:Space}) => {
  const { data: session, status } = useSession()
  const [additional, setAdditional] = useState(false);
  const [imageFile, setImageFile] = useState();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof SpaceSchema> | null>(null);

const user=session?.user

  const form = useForm<z.infer<typeof SpaceSchema>>({
      resolver: zodResolver(SpaceSchema),
      defaultValues: {
          name: space?.name,
          image: space?.image,
          title: space?.title,
          description: space?.description,
          isDarkTheme: space?.isDarkTheme,
          buttonText: space?.buttonText,
          ConsentStatement: space?.ConsentStatement,
          thankyouPageTitle: space?.thankyouPageTitle,
          thankyouPageText: space?.thankyouPageText,
      },
  });


  const onSubmit = async (data: z.infer<typeof SpaceSchema>) => {
      setFormData(data);
      setPreview(true);
  };
  return (
    <>
    {preview ? (
      <EditSpacePreview
        formData={formData}
        selectedFile={selectedFile}
        setEditSpace={setEditSpace}
        user={user}
        imageFile={imageFile}
        setPreview={setPreview}
        space={space}
      />
    ) : (
      <div className="w-full py-12 px-4 md:px-8 lg:px-12">
                <div className="flex flex-col gap-4 md:w-full w-[80%]">
                  <h1 className="md:text-center font-bold text-3xl md:text-3xl lg:text-4xl text-[#EA580C] ">
                    Edit your space
                  </h1>
                  <p className="md:text-center tracking-wide md:px-8 lg:px-10 text-muted-foreground md:text-md text-sm">
                 You can always edit and preview your spaces
                  </p>
                </div>
        <div className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row items-center justify-between pb-4 gap-4">
                <div className="w-full md:w-[70%]">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Space Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name"
                            {...field}
                            className="bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-[20%]">
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Space Logo</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={imageFile ? imageFile : space?.image}
                              />
                              <AvatarFallback>img</AvatarFallback>
                            </Avatar>
                            <CustomUploadButton
                              setSelectedFile={setSelectedFile}
                              setLocalAvatarUrl={setImageFile}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Header Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Your custom message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        {...field}
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row items-center justify-between pb-4 gap-4">
                <div className="w-full md:w-[30%]">
                  <FormField
                    control={form.control}
                    name="isDarkTheme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color Mode</FormLabel>
                        <div className="flex items-center space-x-4 rounded-md border dark:border-neutral-800 p-4">
                          <Moon />
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Dark Mode
                            </p>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked) =>
                                field.onChange(checked)
                              }
                            />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full md:w-[60%]">
                  <FormField
                    control={form.control}
                    name="buttonText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Button Text</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Text"
                            {...field}
                            className="bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="ConsentStatement"
                render={({ field }) => (
                  <FormItem className="pb-4">
                    <FormLabel>Consent statement</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Statement"
                        {...field}
                        className="bg-transparent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p
                className="text-sm text-[#EA580C] cursor-pointer hover:underline pb-4"
                onClick={() => setAdditional(!additional)}
              >
                Customize Thank you Page
              </p>
              {additional && (
                <>
                  <FormField
                    control={form.control}
                    name="thankyouPageTitle"
                    render={({ field }) => (
                      <FormItem className="pb-4">
                        <FormLabel>Thank you title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Thank you!"
                            {...field}
                            className="bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thankyouPageText"
                    render={({ field }) => (
                      <FormItem className="pb-4">
                        <FormLabel>Thank you text</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Thank you so much for your shoutout! It means a ton for us! 🙏"
                            {...field}
                            className="bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              <div className="flex items-center justify-between">
                <Button variant={"outline"} onClick={() => setEditSpace(false)}>
                  Cancel
                </Button>
                <Button className="flex items-center gap-2" type="submit">
                  <Eye size={18} /> Preview
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    )}
  </>
  
  )
}

export default EditSpace
EditSpace