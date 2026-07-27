import PageHero from '@/components/ui/PageHero';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import { MEDIA_IMG } from '@/lib/media';
import { getGallery } from '@/lib/data';

export const metadata = { title: 'Gallery' };

export default async function GalleryPage() {
  const images = await getGallery('GALLERY');
  return (
    <>
      <PageHero title="Photo Gallery" image={MEDIA_IMG.portNightCranes} crumbs={[{ label: 'Gallery' }]} />
      <PhotoGrid images={images} />
    </>
  );
}
