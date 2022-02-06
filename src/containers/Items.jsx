import Card from '../components/Card/Card';
import './Items.css';

const Items = ({ items }) => {
  if (items && items.length > 0) {
    return <div className="Items">{items.map((item) => <Card item={item} />)}</div>;
  }

  return <p>No hay registros</p>;
};

export default Items;
