const App = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center">Bootstrap and React Integration</h1>
            <button className="btn btn-primary">Click Me</button>
            <div className="card mt-4" style={{ width: '18rem' }}>
                <img src="https://via.placeholder.com/150" className="card-img-top" alt="Placeholder" />
                <div className="card-body">
                    <h5 className="card-title">Card Title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-success">Go somewhere</a>
                </div>
            </div>
        </div>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);