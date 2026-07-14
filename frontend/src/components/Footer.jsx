function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="fw-bold mb-3">💼 Job Portal</h4>

            <p>
              Your trusted platform for finding jobs and connecting with top
              recruiters across different industries.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="fw-bold mb-3">Quick Links</h4>

            <ul className="list-unstyled">
              <li className="mb-2">Home</li>
              <li className="mb-2">Jobs</li>
              <li className="mb-2">About</li>
              <li className="mb-2">Login</li>
              <li className="mb-2">Register</li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h4 className="fw-bold mb-3">Contact</h4>

            <p>📧 support@jobportal.com</p>
            <p>📞 +91 9876543210</p>
            <p>📍 Kerala, India</p>
          </div>

        </div>

        <hr />

        <div className="text-center">
          <p className="mb-0">
            © 2026 Job Portal. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;