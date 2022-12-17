import PulseLoader from "react-spinners/PulseLoader";
import { useContext } from 'react';
import { ThemeContext } from 'styled-components'

const Spinner = (props: {}) => {
    const themeContext = useContext(ThemeContext)
    return (
        <PulseLoader color={themeContext.buttonColor} loading={true} speedMultiplier={0.75} />
    );
}

export default Spinner;