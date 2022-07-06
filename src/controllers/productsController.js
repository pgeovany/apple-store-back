import STATUS from '../utils/statusCodes.js';
import { closeDataBase } from '../databases/mongo.js';
import getAllProducts from '../utils/products/getAllProducts.js';

async function getProducts(req, res) {
  try {
    const products = await getAllProducts();

    res.send(products);
  } catch (error) {
    console.log(error);
    res.sendStatus(STATUS.INTERNAL_SERVER_ERROR);
  } finally {
    closeDataBase();
  }
}

export default getProducts;
