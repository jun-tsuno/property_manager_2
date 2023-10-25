import BackButton from '@/components/back-button/BackButton';
import { HouseIllustration } from '@/components/icons';
import ListItem from '@/components/pages/house-page/ListItem';
import { prisma } from '@/lib/prisma';
import { Metadata, ResolvingMetadata } from 'next';
import { cache } from 'react';

const fetchHouse = cache(async (houseId: string) => {
  try {
    const house = await prisma.house.findUnique({
      where: { id: houseId },
      include: {
        tenant: {
          select: {
            id: true,
          },
        },
      },
    });

    return house;
  } catch (error) {
    console.log(error);
    return null;
  }
});

export async function generateMetadata(
  { params }: { params: { house_id: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const houseId = params.house_id;

  try {
    const house = await fetchHouse(houseId);

    return { title: house?.houseName };
  } catch (error) {
    return { title: 'House Detail' };
  }
}

const HousePage = async ({ params }: { params: { house_id: string } }) => {
  const houseId = params.house_id;
  const house = await fetchHouse(houseId);
  const tenantsCount = house?.tenant.length;

  return (
    <>
      <section className='mb:mb-[120px] pb-8 pt-6'>
        <BackButton label='Home' href='/dashboard' className='mb-2' />
        <h2 className='mb-8 lg:mb-16'>House Detail</h2>

        <div className='flex flex-col gap-4 md:flex-row md:items-center md:gap-10'>
          <HouseIllustration className='mx-auto aspect-square w-[180px] rounded-full border border-slate-300 md:w-[220px]' />
          <ul className='md:min-w-[300px] md:max-w-[600px] md:grow'>
            <ListItem label='House Name' value={house?.houseName} />
            <ListItem label='Location' value={house?.location} />
            <ListItem
              label='Current Tenants'
              value={tenantsCount?.toString()}
            />
          </ul>
        </div>
      </section>
    </>
  );
};

export default HousePage;
