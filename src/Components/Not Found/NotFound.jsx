// 404 Page Component
function NotFound() {
  return (
    // Center the content both vertically and horizontally
    <div className="flex flex-col items-center justify-center h-screen p-4 text-center">
      
      {/* Heading */}
      <h1>404: Page Not Found</h1>
      
      {/* Description */}
      <p>
        The page you are looking for does not exist or you do not have access.
      </p>
    </div>
  );
}

export default NotFound;
