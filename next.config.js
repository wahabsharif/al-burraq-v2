// next.config.js

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "ibb.co",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "imgbb.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  // env: {
  //   NEXT_PUBLIC_HOSTNAME: "http://localhost:3000",
  //   MONGODB_URI:
  //     "mongodb+srv://alburraq:alburraq123group@alburraqcluster.nu1qjnr.mongodb.net/?retryWrites=true&w=majority&appName=AlBurraqCluster",
  //   NEXTAUTH_SECRET: "+Vv6ktPicON2v4DGbDk6ICwIsrOFalI+Oek3YNSKrew=",
  //   NEXTAUTH_URL: "http://localhost:3000",
  //   SECRET: "U4CSN3eS9u8j5pBXJyJSv17WGWLTHnmX98rkHS7fQXg=",
  // },
};

module.exports = nextConfig;
