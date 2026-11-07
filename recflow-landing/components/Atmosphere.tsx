export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#323233]" />
      <div className="absolute -top-[18%] left-1/2 h-[78%] w-[140%] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.28)_0%,rgba(50,50,51,0.15)_42%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(20,20,21,0.55)_100%)]" />
      <div className="atmosphere-dust absolute inset-0 opacity-40" />
    </div>
  );
}
