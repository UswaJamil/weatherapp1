import Hero from '@/Components/home/Hero';
import * as prismic from '@prismicio/client';

// Prismic client
const client = prismic.createClient('weather-ap');

export default async function Home() {
  const page = await client.getSingle('home');

  return (
    <div>
      <Hero page={page} />
    </div>
  );
}
