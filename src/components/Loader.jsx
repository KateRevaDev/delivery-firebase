import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <div className="loading-container">
            <RotatingLines
                strokeColor="grey"
                strokeWidth="2"
                animationDuration="0.9"
                width="140"
                visible={true}
            />
        </div>
    );
};

export default Loader;