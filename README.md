#### **POST** - Sign-up

In order to sign-up, make a post request to: https://apple-store0.herokuapp.com/sign-up \
sending a body in the format:

```
{
  name: "...",
  email: "...",
  password: "..."
}
```

#### **POST** - Sign-in

In order to sign-in, make a post request to: https://apple-store0.herokuapp.com/sign-in
sending a body in the format:

```
{
  email: "...",
  password: "..."
}
```

#### **GET** - Products

In order to get products, make a get request to: https://apple-store0.herokuapp.com/products
receiving a response in the format:

```
[
  {
    "_id": "Product Id",
    "name": "Product name",
    "price": 100,
    "image": "Image_link.png",
    "description": "Product description."
  }
]
```
