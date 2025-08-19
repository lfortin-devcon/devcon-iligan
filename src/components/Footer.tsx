const Footer = () => {
  return (
    <footer className="bg-devcon-dark-gray text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex items-center space-x-1">
                <div className="brand-circle-yellow"></div>
                <div className="brand-circle-orange"></div>
                <div className="brand-circle-purple"></div>
                <div className="brand-circle-green"></div>
              </div>
              <h3 className="devcon-heading text-xl font-black tracking-wider text-white">
                DEVCON Iligan
              </h3>
            </div>
            <p className="text-white/80 font-brand mb-4 max-w-md">
              DEVCON Iligan is the local chapter of the Philippines' largest volunteer tech community. 
              Building the future of technology in Northern Mindanao, one connection at a time.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-xs font-bold">f</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-xs font-bold">@</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <span className="text-xs font-bold">in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="devcon-heading text-sm mb-4 text-white">
              Quick links
            </h4>
            <ul className="space-y-2 font-brand">
              <li><a href="#about" className="text-white/80 hover:text-white transition-colors">About</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
              <li><a href="/volunteer" className="text-white/80 hover:text-white transition-colors">Volunteer</a></li>
              <li><a href="https://facebook.com/devconiligan" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">Facebook</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="devcon-heading text-sm mb-4 text-white">
              Get in touch
            </h4>
            <ul className="space-y-2 font-brand text-white/80">
              <li>DEVCON Iligan FB page</li>
              <li>iDEYA at MSU-IIT</li>
              <li>Iligan City, Lanao del Norte</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 font-brand text-sm">
            © 2024 DEVCON Iligan. All rights reserved.
          </p>
          <p className="text-white/60 font-brand text-sm mt-2 md:mt-0">
            Made with ❤️ by the tech community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;