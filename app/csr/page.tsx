import PageHero from '@/components/ui/PageHero';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Reveal from '@/components/motion/Reveal';
import { MEDIA_IMG } from '@/lib/media';
import { getGallery } from '@/lib/data';
import { HeartPulse, GraduationCap, LifeBuoy } from 'lucide-react';

export const metadata = { title: 'CSR Activities' };

const FOCUS = [
  { icon: HeartPulse, title: 'Healthcare', body: 'Improving access to healthcare and medical support for the communities where we operate.' },
  { icon: GraduationCap, title: 'Education', body: 'Backing education and skilling initiatives that create lasting opportunity for the next generation.' },
  { icon: LifeBuoy, title: 'Disaster Response', body: 'Rapid, on-ground relief and support during calamities across Odisha and the eastern seaboard.' },
];

export default async function CsrPage() {
  const images = await getGallery('CSR');
  return (
    <>
      <PageHero
        title="Corporate Social Responsibility"
        subtitle="“We make a living by what we get, but we make a life by what we give.” — Winston Churchill"
        image={MEDIA_IMG.aerialIndustrial}
        crumbs={[{ label: 'CSR' }]}
      />

      <section className="mx-auto max-w-5xl px-6 pt-16">
        <Reveal>
          <p className="text-center text-lg leading-relaxed text-slate-300">
            At PPL, we are committed to creating shared value. Our CSR initiatives emphasize
            healthcare, education and disaster response — bringing tangible, lasting impact to the
            communities where we operate.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={Math.min(i * 0.08, 0.3)}>
              <div className="h-full rounded-2xl border border-white/10 bg-ink-900 p-6 text-center">
                <f.icon className="mx-auto h-8 w-8 text-accent-400" aria-hidden />
                <h3 className="mt-3 font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <PhotoGrid images={images} />
    </>
  );
}
