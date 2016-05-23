# CORS
CORS Philosophy: browsers from main manufacturers have decided that all JS is fair game to execute, plus there is only one scope for cookies and sensitive info. Although this scope is not offered to the code, it is automatically attached to requests the code makes.

To prevent users stealing info from each other, enforce **same origin**.

This makes it hard to perform requests to APIs. So, servers now have to explicitly declare a resource as publicly available through headers, or use headers to specify under which authentication circumstances they will make it available.

[Adobe article](http://www.adobe.com/devnet/archive/html5/articles/understanding-cross-origin-resource-sharing-cors.html). Itself not very good, but pointed to useful resources.

[Enable Cors](http://enable-cors.org/index.html). Also not the best, but has better resources than Adobe's.

Quick way to enable CORS:
```
Access-Control-Allow-Origin: *
```
Just setting this header might not work. Other headers to consider:
```
Access-Control-Allow-Methods: GET PUT
Access-Control-Allow-Headers: accept, content-type
```

The `Access-Control-Allow-Headers` header does not allow wildcards. It must be an exact match. [See spec](http://www.w3.org/TR/cors/#access-control-allow-headers-response-header)

If you expect a large number of headers, you can read in the value of the Access-Control-Request-Headers header and echo that value back in the Access-Control-Allow-Headers header.

[html5rockes](http://www.html5rocks.com/en/tutorials/cors/). Pretty good article.
