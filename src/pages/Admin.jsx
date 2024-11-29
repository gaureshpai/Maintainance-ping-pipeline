import React from 'react'
import "../../public/assets2/css/style.css"
// import "../../public/assets2/resource/eye.png"
// import "../../public/assets2/resource/history.png"
// import "../../public/assets2/resource/home.png"
// import "../../public/assets2/resource/solving.png"
// import "../../public/assets2/resource/progress.jpeg"
function Admin() {
  return (
    <div>
  <div className="container">
    {/* Sidebar */}
    <div className="sidebar">
      <a href=""><img src="/public/assets2/resource/eye.png" alt="View Complaint" /></a>
      <a href=""><img src="/public/assets2/resource/progress.jpeg" alt="Resolve Complaint" /></a>
      <a href=""><img src="/public/assets2/resource/history.png" alt="History of Resolved Complaints" /></a>
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
          <h2>Recent Activities</h2>
          <p>Manage your products and view their sales performance.</p>
        </div>
        {/* Tabs */}
        <div className="tabs">
          <button className="active">All</button>
          <button>Active</button>
          <button>Draft</button>
          <button>Archived</button>
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
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Projecter issue</td>
              <td className="actions">...</td>
              <td>A318</td>
              <td>19-11-2024</td>
              <td>Completed</td>
              <td><span className="status">Resolved</span></td>
            </tr>
            <tr>
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Fan and Lights</td>
              <td className="actions">...</td>
              <td>B213</td>
              <td>19-11-2024</td>
              <td>In progress</td>
              <td><span className="status">In progress</span></td>
            </tr>
            <tr>
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Fan issue</td>
              <td className="actions">...</td>
              <td>B115</td>
              <td>20-11-2024</td>
              <td>In progress</td>
              <td><span className="status">In progress</span></td>
            </tr>
            <tr>
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Projecter Not Connectong</td>
              <td className="actions">...</td>
              <td>A117</td>
              <td>21-11-2024</td>
              <td>Pending</td>
              <td><span className="status">New</span></td>
            </tr>
            <tr>
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Tube Light</td>
              <td className="actions">...</td>
              <td>A317</td>
              <td>18-11-2024</td>
              <td>Completed</td>
              <td><span className="status">Resolved</span></td>
            </tr>
            <tr>
              <td><img src="\public\assets2\resource\aj.png" alt="Product" style={{marginRight: 10}} /> Tubelight </td>
              <td className="actions">...</td>
              <td>A216</td>
              <td>21-11-2024</td>
              <td>Pending</td>
              <td><span className="status">New</span></td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</div>

  )
}
export default Admin
