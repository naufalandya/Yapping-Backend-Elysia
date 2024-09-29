import ImageKit from "imagekit";

export default new ImageKit({
    publicKey: Bun.env.IMAGEKIT_PUBLIC_KEY as string,
    privateKey: Bun.env.IMAGEKIT_PRIVATE_KEY as string,
    urlEndpoint: Bun.env.IMAGEKIT_URL_ENDPOINT as string,
  });