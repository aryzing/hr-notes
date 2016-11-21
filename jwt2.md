# JWT

Notes from https://www.packtpub.com/mapt/book/application_development/9781784395407/1

> OAuth 2.0 is a protocol that allows distinct parties to share information and resources in a secure and reliable manner.

**Authentication** is the process of validating whether a person (or system) is actually who they say they are.

**Authorization** is the process of determining what actions you are allowed to perform once you have been authenticated.

> the OAuth 2.0 protocol can be combined with OpenID to provide an authentication layer on top of the authorization framework described by the OAuth 2.0 specification.

In other words, Oauth 2.0 is an Authorization only protocol. When the protected resource is your identity, then it can act as an authentication mechanism too.


# Status codes

**401 Unauthorized** When token expires, both your rights (authorization) and possibly identity (if also used for authentication) are lost.

**403 Forbidden** When a token is valid, you may be correctly authenticated, but not have the rights to that resource.

In short,

* expired token, use 401
* valid token, not enough privilages, use 403
