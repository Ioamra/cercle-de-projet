function Footer() {
  return (
    <footer className="bg-main-one text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-2">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
                <path d="M12 6v6l4 2"></path>
              </svg>
              <span className="font-bold text-xl">Kestrel</span>
            </div>
            <p className="mt-2 text-sm text-orange-100">Learn, play, and make a difference for our planet.</p>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2 text-orange-100">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-lg mb-2">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-200">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1-11.95 1.5H4a8 8 0 1 0 8-8v1.5A6 6 0 0 1 16 8z"></path>
                  <path d="M12 12v6"></path>
                  <path d="M12 18h0"></path>
                </svg>
              </a>
              <a href="#" className="hover:text-orange-200">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43 1a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.5 0c-2.5 0-4.5 2-4.5 4.5 0 .35.04.7.1 1.03A12.94 12.94 0 0 1 1.64 1.1a4.5 4.5 0 0 0-.61 2.27c0 1.56.8 2.93 2.02 3.74A4.48 4.48 0 0 1 .96 6v.06c0 2.18 1.55 4 3.6 4.42a4.48 4.48 0 0 1-2.02.08 4.48 4.48 0 0 0 4.18 3.12A9 9 0 0 1 0 19.54a12.94 12.94 0 0 0 7 2.05c8.4 0 13-7 13-13 0-.2 0-.39-.01-.58A9.35 9.35 0 0 0 23 3z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t bg-main-one text-center text-sm text-orange-100">
          <p>&copy; {new Date().getFullYear()} Kestrel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
