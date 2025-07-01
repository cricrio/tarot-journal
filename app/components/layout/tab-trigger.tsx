import { TabsTrigger as RadixTrigger } from '@radix-ui/react-tabs';

export const TabsTrigger = ({
  children,
  value,
}: {
  children: string;
  value: string;
}) => (
  <RadixTrigger
    value={value}
    className='data-[state=active]:border rounded-md p-1'
  >
    {children}
  </RadixTrigger>
);
