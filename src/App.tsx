import React from 'react';
import ImageViewer from "./image-viewer";

function App() {
    // unsplash images
    const images = [
        "https://images.unsplash.com/photo-1594482899282-c47573c8446f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2137&q=80",
        "https://images.unsplash.com/photo-1635510239464-586dba1ff873?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1635598787672-4b97e956002b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1974&q=80"
    ];

    return (
        <ImageViewer images={images} view="fit" menuTop={true} title="Test"/>
    );
}

export default App;
