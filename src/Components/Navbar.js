import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 20px;
`;

const Div = styled.div`
    text-decoration: none;
    display: flex;
    justify-content: space-between;
`;

const Div1 = styled.div`
    margin: 8px;
    font-family: "Brush Script MT", cursive;
    font-size: 30px;
    color: Red;
`;

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'grey'
};


const Navbar = () => {
    return ( 
        <Nav>
            <Div1>React Notes Application</Div1>
            <Div>
                <Link to="/" style={linkStyle} >Notes</Link>
                <Link to="/addnote" style={linkStyle}>+Add</Link>
            </Div>
        </Nav>
     );
}
 
export default Navbar;