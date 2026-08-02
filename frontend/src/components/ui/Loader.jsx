
/**
 * Loader Component
 *
 * Displays a loading indicator while content is being processed.
 **/
function Loader() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-6 h-6 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;