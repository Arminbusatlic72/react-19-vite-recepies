export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} Maine Cuisine. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white transition">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
