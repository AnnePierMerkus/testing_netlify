

const Navbar = () => {
    return (
        < header className = "bg-teal-600 text-white py-4 px-8" >
            <div className="flex justify-between items-center">
                {/* Align CardioCare to the left */}
                <h1 className="text-2xl font-bold">CardioCare</h1>

                {/* Align all buttons to the right */}
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline text-white">Home</a></li>
                        <li><a href="/services" className="hover:underline text-white">Services</a></li>
                        <li><a href="/about-us" className="hover:underline text-white">About Us</a></li>
                        <li><a href="/login" className="hover:underline text-white">Login</a></li>
                    </ul>
                </nav>
            </div>
    </header >
    )
}

export default Navbar;