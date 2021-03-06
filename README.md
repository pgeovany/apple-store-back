#### **POST** - Sign-up

In order to sign-up, make a post request to: https://apple-store0.herokuapp.com/sign-up
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

The server will respond with an object in the format:

```
{
  name: "...",
  email: "...",
  token: "..."
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

#### **_POST_** - Order

In order to register a new order, make a post request to: https://apple-store0.herokuapp.com/order sending a body in the format:

```
{
  adress: "...",
  paymentInfo:
    {
      name: "Name on the card"
      cardType: "credit",
      cardNumber: 9999999999999999,
      cvv: 999
    }
  items: [
    {
      "_id": "Product Id",
      "name": "Product name",
      "price": 100,
      "image": "Image_link.png",
      "description": "Product description."
    }
  ]
}
```

and an **Authorization header** in the Bearer TOKEN format.

#### **POST** - Sign-out

In order to sign out, make a post request to: https://apple-store0.herokuapp.com/sign-out sending the token with the **Authorization** key in the headers. No body needed.
