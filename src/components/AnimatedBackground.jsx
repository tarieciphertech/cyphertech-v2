export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 blur-[180px] rounded-full top-[-160px] right-[-140px] animate-pulse" />
      <div className="absolute w-[650px] h-[650px] bg-purple-600/20 blur-[180px] rounded-full bottom-[-170px] left-[-130px] animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px] opacity-20" />
    </div>
  );
}
