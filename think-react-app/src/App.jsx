import {useState} from 'react';

const PRODUCTS = [
  {category: 'Fruits', price: '$1', stocked: true, name: 'Apple'},
  {category: 'Fruits', price: '$1', stocked: true, name: 'Dragonfruit'},
  {category: 'Fruits', price: '$2', stocked: false, name: 'Passionfruit'},
  {category: 'Vegetables', price: '$2', stocked: true, name: 'Spinach'},
  {category: 'Vegetables', price: '$4', stocked: false, name: 'Pumpkin'},
  {category: 'Vegetables', price: '$1', stocked: true, name: 'Peas'},
];

export default function App() {
  const [products, setProducts] = useState([...PRODUCTS]);

  const handleAddProduct = product => {
    const selectedCategoryProductList = products.filter(
      p => p.category === product.category,
    );

    const unSelectedCategoryProductList = products.filter(
      p => p.category !== product.category,
    );

    selectedCategoryProductList.push(product);

    setProducts([
      ...unSelectedCategoryProductList,
      ...selectedCategoryProductList,
    ]);
  };

  return (
    <>
      <AddProductForm onAddProduct={handleAddProduct} />
      <FilterableProductTable products={products} />;
    </>
  );
}

function FilterableProductTable({products}) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div style={{padding: '20px'}}>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockOnlyChange={setInStockOnly}
      />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}

function SearchBar({
  filterText,
  inStockOnly,
  onFilterTextChange,
  onInStockOnlyChange,
}) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
        placeholder="Search..."
      />
      <br />
      <label>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={e => onInStockOnlyChange(e.target.checked)}
        />
        &nbsp;Only show products in stock
      </label>
    </form>
  );
}

function ProductTable({products, filterText, inStockOnly}) {
  const rows = [];
  let lastCategory = null;

  products.forEach(product => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={`category-${product.category}-${rows.length + 1}`}
        />,
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function ProductCategoryRow({category}) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductRow({product}) {
  const productName = product.stocked ? (
    product.name
  ) : (
    <span style={{color: 'red'}}>{product.name}</span>
  );
  return (
    <tr>
      <td>{productName}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function AddProductForm({onAddProduct}) {
  const [state, setState] = useState({
    category: 'Fruits',
    name: '',
    price: '$3',
    stocked: false,
  });

  const handleOnChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(state);

    onAddProduct(state);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{display: 'flex', gap: 12, alignItems: 'center'}}
    >
      <select value={state.category} onChange={handleOnChange} name="category">
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
      </select>

      <input
        type="text"
        placeholder="name"
        name="name"
        value={state.name}
        onChange={handleOnChange}
      />

      <select value={state.price} onChange={handleOnChange} name="price">
        <option value="3">$3</option>
        <option value="5">$5</option>
        <option value="10">$10</option>
      </select>

      <div>
        <input
          type="checkbox"
          checked={state.stocked}
          id="stockStatus"
          onChange={handleOnChange}
          name="stocked"
        />
        <label htmlFor="stockStatus">Stock Status</label>
      </div>

      <button type="submit">Add </button>
    </form>
  );
}
