# 🍪 Cookies vs Signed Cookies - Simple Explanation

## What is a Cookie?

A **cookie** is a small piece of data that a server sends to a web browser.  
The browser stores it and sends it back with every request to the same server.  
It helps the server remember who you are between requests (like your login info, preferences, cart items, etc.).

> ✅ Example:  
> When you log in, the server can send a cookie like `user_id=123`.  
> Next time your browser sends this cookie, the server knows it's you.
 
---

## What is a Signed Cookie?

A **signed cookie** is just like a regular cookie, but it includes a **digital signature** to prevent tampering.

> ✅ Example:  
> The server sends: `user_id=123.signature=xyz123`  
> If someone tries to change `user_id=999`, the signature won't match, and the server will reject it.

This ensures that the value inside the cookie **hasn’t been changed** by the user.

---

## Why Use Signed Cookies?

- Cookies can be **seen and edited** by the client (browser).
- Signed cookies protect **important data** by ensuring it hasn’t been **modified**.
- They are **not encrypted**—only signed, so the value is still visible but safe from tampering.

---

## Key Differences

| Feature          | Cookie                         | Signed Cookie                     |
|------------------|--------------------------------|-----------------------------------|
| Visibility       | Visible to client              | Visible to client                 |
| Editable by user | Yes                            | Yes, but server can detect change |
| Tamper-safe      | ❌ No                          | ✅ Yes                           |
| Encryption       | ❌ No                          | ❌ No                            |
| Usage            | Basic info                     | Sensitive but not secret info     |

---

## Node.js Example with Express

```js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser('mySecretKey')); // for signed cookies

app.get('/set', (req, res) => {
  res.cookie('normalCookie', 'hello');
  res.cookie('signedCookie', 'secureData', { signed: true });
  res.send('Cookies set!');
});

app.get('/get', (req, res) => {
  res.send({
    normal: req.cookies.normalCookie,
    signed: req.signedCookies.signedCookie
  });
});

app.listen(3000, () => console.log('Running on http://localhost:3000'));
