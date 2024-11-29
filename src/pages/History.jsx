import React from 'react'
import "../../public/assets2/css/style.css"
// import "../../public/assets2/resource/eye.png"
// import "../../public/assets2/resource/history.png"
// import "../../public/assets2/resource/home.png"
// import "../../public/assets2/resource/solving.png"
// import "../../public/assets2/resource/progress.jpeg"

function History() {
  return (
    <div>
  <div className="container">
    {/* Sidebar */}
    <div className="sidebar">
      <a href=""><img src="/public/resource/home.png" alt="Home" /></a>
      <a href=""><img src="/public/resource/eye.png" alt="View Complaint" /></a>
      <a href=""><img src="/public/resource/progress.jpeg" alt="Resolve Complaint" /></a>
      <a href=""><img src="/public/resource/history.png" alt="History of Resolved Complaints" /></a>
    </div>
    {/* Main Content */}
    <div className="main-content">
      {/* Topbar */}
      <div className="topbar">
        <div className="breadcrumb">
          <h2>Welcome Admin!</h2>
        </div>
        <div className="topbar-actions">
          <input type="text" placeholder="Search..." />
          {/* <button>Export</button>
    <button>Add Product</button> */}
        </div>
      </div>
      {/* Product List */}
      <div className="product-list">
        <div className="product-header">
          <h2>Solved Complaints</h2>
          <p>Manage your products and view their sales performance.</p>
        </div>
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Discrption</th>
              <th>Room No.</th>
              <th>Date of Regi.</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><img src="/public/resource/nature.jpg" alt="Product" style={{marginRight: 10}} /> Projecter issue</td>
              <td className="actions">...</td>
              <td>A318</td>
              <td>19-11-2024</td>
              <td>Completed</td>
              <td><span className="status">Resolved</span></td>
            </tr>
            <tr>
              <td><img src="/public/resource/nature.jpg" alt="Product" style={{marginRight: 10}} /> Tube Light</td>
              <td className="actions">...</td>
              <td>A317</td>
              <td>18-11-2024</td>
              <td>Completed</td>
              <td><span className="status">Resolved</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

  )
}

export default History
