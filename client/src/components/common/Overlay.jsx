const Overlay = ({ className, onClick, children }) => {
    const hasChildrenStyle = 'flex items-center justify-center';
    return (
        <div
            className={`fixed w-screen h-screen   right-0 top-0   bg-black bg-opacity-40 ${
                className ? className : ''
            } ${children ? hasChildrenStyle : ''} `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Overlay;
