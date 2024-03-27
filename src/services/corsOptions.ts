// Allowed client side URLs
const LOCAL_URL = 'http://localhost:3000';
const PRODUCTION_URL = 'https://socialexpressy-client.vercel.app/';
const VERCEL_DEPLOY_PREVIEW_URL = /https:..socialexpressy.*vercel.app/;

const corsOptions = {
  origin: [LOCAL_URL, PRODUCTION_URL, VERCEL_DEPLOY_PREVIEW_URL],
};

export default corsOptions;
