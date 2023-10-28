export const Footer = (): JSX.Element => {
  return (
    <div
      className={
        'relative flex h-[64px] w-full items-center justify-between bg-altotechlight-02 p-4 shadow-[0px_0px_8px_-4px_#00000040]'
      }
    >
      <div>Version 1.0 Copyright 2022, AltoTech</div>
      <div className='col hidden gap-2 md:flex'>
        <div className={'font-semibold text-altotechdark-02 '}>Helps</div>
        <div className={'font-semibold text-altotechdark-02'}>Privacy</div>
        <div className={'font-semibold text-altotechdark-02'}>
          Terms of Service
        </div>
      </div>
    </div>
  );
};
