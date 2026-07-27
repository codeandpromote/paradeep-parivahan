import Image from 'next/image';
import PageHero from '@/components/ui/PageHero';
import SectionHeading from '@/components/ui/SectionHeading';
import PersonGrid from '@/components/about/PersonGrid';
import Reveal from '@/components/motion/Reveal';
import { slideInLeft, slideInRight } from '@/lib/animations';
import { resolveAsset } from '@/lib/images';
import { MEDIA_IMG } from '@/lib/media';
import { getTeam } from '@/lib/data';

export const metadata = { title: 'Our Team' };

export default async function TeamPage() {
  const team = await getTeam();
  const lead = team[0]; // Managing Director & CEO — spotlight
  const board = team.filter((m) => m.category === 'BOARD' && m.id !== lead?.id);
  const kmp = team.filter((m) => m.category === 'KMP');

  return (
    <>
      <PageHero
        title="Our Team"
        subtitle="The board and leadership steering Paradeep Parivahan."
        image={MEDIA_IMG.portCityNight}
        crumbs={[{ label: 'About Us', href: '/about' }, { label: 'Our Team' }]}
      />

      {/* Leadership spotlight */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal variants={slideInLeft}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
              <Image src={resolveAsset(lead.photo)} alt={lead.name} fill className="object-cover" sizes="(max-width:1024px) 100vw, 40vw" />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent-400" />
            </div>
          </Reveal>
          <Reveal variants={slideInRight}>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-accent-400">
              <span className="h-px w-8 bg-accent-500" /> Leadership
            </p>
            <h2 className="font-display text-3xl font-bold text-white">{lead.name}</h2>
            <p className="mt-1 font-medium text-accent-400">{lead.designation}</p>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">{lead.bio}</p>
          </Reveal>
        </div>
      </section>

      {/* Board */}
      <div className="mx-auto max-w-7xl px-6 pt-16">
        <SectionHeading eyebrow="Governance" title="Board of Directors" />
      </div>
      <PersonGrid people={board} />

      {/* KMP */}
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Management" title="Key Managerial Personnel" />
      </div>
      <PersonGrid people={kmp} />
    </>
  );
}
