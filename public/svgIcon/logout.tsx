interface LogoutIconProps {
  fill?: string;
  width?: number;
  height?: number;
  className?: string;
}

const LogoutIcon = ({
  fill = '#000000',
  width = 20,
  height = 20,
  className,
}: LogoutIconProps) => {
  return (
    <>
      <svg
        fill={fill}
        height={height}
        width={width}
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 490.693 490.693'
        xmlSpace='preserve'
        className={className}
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          <g>
            <g>
              <g>
                <path d='M289.6,373.453c-6.613-0.96-12.267,4.16-12.267,10.56v74.667h-256V32.013h256v74.347c0,5.333,3.84,10.133,9.067,10.88 c6.613,0.96,12.267-4.16,12.267-10.56V21.347c0-5.867-4.8-10.667-10.667-10.667H10.667C4.8,10.68,0,15.48,0,21.347v448 c0,5.867,4.8,10.667,10.667,10.667H288c5.867,0,10.667-4.8,10.667-10.667v-85.013C298.667,379,294.827,374.2,289.6,373.453z'></path>
                <path d='M487.573,237.88L380.907,131.213c-4.267-4.053-10.987-3.947-15.04,0.213c-3.947,4.16-3.947,10.667,0,14.827 l88.427,88.427H128.32c-5.227,0-9.92,3.627-10.773,8.853c-1.173,6.72,4.053,12.48,10.56,12.48H454.4l-88.533,88.427 c-4.267,4.053-4.373,10.88-0.213,15.04c4.053,4.267,10.88,4.373,15.04,0.213c0.107-0.107,0.213-0.213,0.213-0.213 l106.667-106.667C491.733,248.867,491.733,242.04,487.573,237.88z'></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </>
  );
};

export default LogoutIcon;
