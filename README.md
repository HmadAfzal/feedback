# Collect Feedback Effortlessly, Display It Instantly
### The easiest way to gather feedbacks, testimonials and reviews and embed it on your site.

![App SS](/public/assets/dashboard.png)

live link: [Feedback.in](https://feedback-in.vercel.app/)
  
## Getting Started

To get started with Feedback, follow these steps:

1. Clone this repository to your local machine.
2. Install the necessary dependencies using `npm install`.
3. Set up your database and environment variables.
4. Run the application using `npm run dev`.
5. Access the application through `http://localhost:3000/`.

## Technologies Used

- **Designing**: shadcn/ui, Tailwind-CSS, AceternityUi, FramerMotion
- **Backend**:Next.js, Typescript, Redux, React-hook-form
- **Database**: MongoDB
- **Image storage**: cloudinary
- **Authentication**: NextAuth

### Setup .env file

```js
// Db connection string
MONGO_URI=

// auth secret
NEXTAUTH_SECRET=

// client id(s) and secret for auth
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

// cloudinary credentials
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=


//see .env.example for more
```

