import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
  {   
      id: '1',
      title: 'Milk',
      price: 3.5,
      description: 'Delicious Milk!'
  },
  {   
      id: '2',
      title: 'Eggs',
      price: 1.0,
      description: 'Big ass Eggs!'
  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(item => <ProductItem
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
        />)}        
      </ul>
    </section>
  );
};

export default Products;
