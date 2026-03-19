interface SoftCardProps {
  children: React.ReactNode;
  className?: string;
}

const SoftCard = ({ children, className }: SoftCardProps) => {
  return (
    <div className={`w-full bg-sidebar p-6 rounded-[1.25rem] border border-white/5 shadow-inner shadow-sidebar shadow-md ${className}`}>
      {children}
    </div>
  );
};

export default SoftCard;