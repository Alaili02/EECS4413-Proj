import styled from 'styled-components';
import NavBar from './features/navbar/NavBar';
import Catalogue from './features/catalogue/Catalogue';
import { Route, Routes } from "react-router-dom"
import Product from './features/product/Product';
import Admin from './features/catalogue/Admin/Admin';


import Cart from "./features/sidebar/Cart/Cart";
import User from "./features/User/User";

const AppWrapper = styled.div`
	display: grid;
    grid-template-columns: 1fr auto auto;
`

function App() {
	return (
		<AppWrapper>
				<NavBar />
				<Routes>
					<Route path="/" element={<Catalogue />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/admin" element={<Admin />} />
				</Routes>
				<Cart defaultWidth="16vw"/>
            	<User defaultWidth="16vw"/>
		</AppWrapper>
	);
}

export default App;
