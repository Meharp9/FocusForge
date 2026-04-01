interface SoftCardProps {
  children: React.ReactNode;
  className?: string;
}

const SoftCard = ({ children, className }: SoftCardProps) => {
  return (
    <div className={`w-full bg-surface p-6 rounded-[1.25rem] border border-border ${className}`}>
      {children}
    </div>
  );
};

export default SoftCard;