import "./Footer.css";

function Footer() {
    return (
        <div className="footer">
            © {new Date().getFullYear()} Video · Все права защищены
        </div>
    )
}

export default Footer;