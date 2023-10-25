interface ListItemProps {
  label: string;
  value: string | undefined;
}

const ListItem = ({ label, value }: ListItemProps) => {
  return (
    <>
      <li className='flex flex-col border-b-[1px] py-3 sm:flex-row'>
        <span className='font-bold sm:min-w-[200px]'>{label}</span>
        {value || '-'}
      </li>
    </>
  );
};

export default ListItem;
