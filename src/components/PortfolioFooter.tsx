const PortfolioFooter = () => {
  return (
    <footer className="mx-auto max-w-[1500px] border-t border-border px-4 py-12 md:px-10">
      <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} DAVID SPACE</p>
        <p>Photography archive · All rights reserved</p>
      </div>
    </footer>
  );
};

export default PortfolioFooter;
