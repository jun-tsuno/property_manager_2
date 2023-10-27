interface ListItemProps {
  label: string;
  children: React.ReactNode;
}

const ListItem = ({ label, children }: ListItemProps) => {
  return (
    <>
      <li className='flex flex-col border-b-[1px] py-3 sm:flex-row'>
        <span className='mb-1 font-bold sm:min-w-[200px]'>{label}</span>
        {children}
      </li>
    </>
  );
};

export default ListItem;
