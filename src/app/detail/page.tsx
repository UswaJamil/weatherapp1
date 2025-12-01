import LeftPanel from '@/Components/leftPanel';
import RightPanel from '@/Components/rightPanel.';

export default async function DetailPage({
  searchParams,
}: {
  searchParams: Promise<{ city?: string }>;
}) {
  const { city } = await searchParams;
  const cityName = city?.trim() || 'Karachi';

  const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

  // Current Weather Fetch
  let weather = null;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`,
      { cache: 'no-store' }
    );
    if (res.ok) weather = await res.json();
  } catch {
    // swallow error silently
  }

  // 5-Day Forecast Fetch
  let forecast = null;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`,
      { cache: 'no-store' }
    );
    if (res.ok) forecast = await res.json();
  } catch {
    // swallow error silently
  }

  // Prismic slices fetch (example)
  let slices: any[] = [];
  try {
    const prismicRes = await fetch(
      `https://your-repo-name.cdn.prismic.io/api/v2/documents/search?ref=YOUR_REF&q=[[at(document.type,"detail")]]`
    );
    if (prismicRes.ok) {
      const prismicData = await prismicRes.json();
      slices = prismicData.results[0]?.data?.body || [];
    }
  } catch {
    // swallow error silently
  }

  return (
    <div className="flex gap-6 max-[1024px]:flex-col min-h-screen bg-black p-4">
      <LeftPanel weather={weather} forecast={forecast} slices={slices} />
      <RightPanel weather={weather} forecast={forecast} slices={slices} />
    </div>
  );
}
