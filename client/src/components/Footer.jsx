const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 py-6 mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} CodeRoaster AI. No developers were harmed in the making of this app.
        </p>
      </div>
    </footer>
  );
};

export default Footer;