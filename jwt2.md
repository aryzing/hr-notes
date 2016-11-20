# JWT

Notes from https://www.packtpub.com/mapt/book/application_development/9781784395407/1

> OAuth 2.0 is a protocol that allows distinct parties to share information and resources in a secure and reliable manner.

**Authentication** is the process of validating whether a person (or system) is actually who they say they are.

**Authorization** is the process of determining what actions you are allowed to perform once you have been authenticated.

Oauth 2.0 is an Authorization only protocol. How to authorize protected resources. When the protected resource is your identity, then it can act as an authentication mechanism too.

> the OAuth 2.0 protocol can be combined with OpenID to provide an authentication layer on top of the authorization framework described by the OAuth 2.0 specification.

# Status codes

I'm currently working on a project where it has been decided that sessions must only last a given amount of time controlled via signed JWTs. So eventually, the server will have to reject a user's request due to expired credentials.

According to the spec, `401 Unauthorized` seems like an appropriate response, since an expired token no longer serves to authorize a request to a protected resource. However, the official spec immediately references "Authorization" on the very first sentence.

> The 401 (Unauthorized) status code indicates that the request has not
   been applied because it lacks valid **authentication** credentials for
   the target resource.

Authorization and authentication are different things, so which is it?

To complicate matters more, I also find the

But when a token expires, the user info contained in it is rendered invalid and thus the user is too unauthenticated.

However, a user might try to access a protected resource with a valid token, but might not have sufficient privilages => 403 forbidden. Try with different credentials

Conclusion:

* expired token: 401
* valid token, not enough privilages: 403
