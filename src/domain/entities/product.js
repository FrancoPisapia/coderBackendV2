class Product
{
  constructor(id, title, description,code,price,stock,category,thumbnail,owner)
  {
      this.id = id;
      this.title = title;
      this.description = description;
      this.code = code;
      this.price = price;
      this.stock = stock;
      this.category = category;
      this.thumbnail=thumbnail;
      this.owner=owner
  }
}

export default Product;