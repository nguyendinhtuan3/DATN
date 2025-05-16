const Overlay = ({ className, onClick, children }) => {
    const hasChildrenStyle = 'flex items-center justify-center';
    return (
        <div
            className={`fixed w-screen h-screen   right-0 top-0 bg-overlay ${className ? className : ''} ${
                children ? hasChildrenStyle : ''
            } `}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Overlay;
