import Image from 'next/image';
import { Button } from '../../components/ui/button';

const TopPage = () => {
	return (
		<>
			<div>
				{/* <div className='w-full h-[600px] bg-[url("/image/hero-house.jpg")] bg-cover bg-center'>
					hello
				</div> */}
				<div className='h-[80vh] relative'>
					<Image
						src={'/image/hero-house.jpg'}
						alt='house'
						width={0}
						height={0}
						sizes='100vh'
						className='w-full h-full object-cover'
					/>
					<div className='absolute inset-0 flex flex-col items-center justify-center bg-image-blur text-white'>
						<h1 className='text-3xl'>Manage your Properties</h1>
						<p className='text-center text-lg mt-3 mb-10'>
							Effortless Property Management: Simplify House Ownership and
							Tenant Relations
						</p>
						<Button className='bg-gradient-to-r from-gradient-var1 to-gradient-var2 hover:brightness-110'>
							Get Started
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default TopPage;
