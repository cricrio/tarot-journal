import { Link } from 'react-router';

export const TopBar = () => {
  return (
    <div className='w-full h-16 bg-indigo-900 flex items-center justify-between p-4 border-b-1'>
      <Link to='/'>
        <h1 className='text-white text-2xl'>Mon journal de tarot</h1>
      </Link>
    </div>
  );
};
