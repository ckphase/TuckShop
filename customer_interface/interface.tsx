function ProductCard({ product, isAdmin, onEdit, onOrder }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl mt-2">₹{product.price}</p>
      <p>Stock: {product.stock}</p>
      {isAdmin ? (
        <button 
          onClick={() => onEdit(product)}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Edit
        </button>
      ) : (
        <button 
          onClick={() => onOrder(product)}
          className="bg-green-500 text-white px-4 py-2 rounded mt-2"
          disabled={product.stock === 0}
        >
          Order
        </button>
      )}
    </div>
  );
}
function Dashboard({sales,orders})0
return;

  <h3>pending ordes</h3>
<h3>
    <div className="bg-white p-4 rounded shadow-md mb-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3>Total Sales</h3>
          <p className="text-2xl">₹{sales}</p>
        </div>
        <div>
          <h3>Pending Orders</h3>
          <p className="text-2xl">{orders.length}</p>
        </div>
      </div>
    </div>
  );
function App() {
  const [products, setProducts] = React.useState([
    { id: 1, name: 'Sandwich', price: 50, stock: 10, description: 'Fresh vegetable sandwich' },
    { id: 2, name: 'Samosa', price: 15, stock: 20, description: 'Hot and crispy' },
    { id: 3, name: 'Cold Drink', price: 25, stock: 15, description: 'Refreshing beverages' }
  ]);

  const [orders, setOrders] = React.useState([]);
  const [totalSales, setTotalSales] = React.useState(0);
  const [userRole, setUserRole] = React.useState('user'); // 'user' or 'admin'

  const handleEdit = (product) => {
    const newPrice = prompt('Enter new price:', product.price);
    const newStock = prompt('Enter new stock:', product.stock);
    
    if (newPrice && newStock) {
      setProducts(products.map(p => 
        p.id === product.id 
          ? {...p, price: Number(newPrice), stock: Number(newStock)}
          : p
      ));
    }
  };
}
