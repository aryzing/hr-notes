# Auth

# RFC 6749 notes

Out of scope.

> This specification is designed for use with HTTP ([RFC2616]). The use of OAuth over any protocol other than HTTP is out of scope.

Def. resource owner. An owner of a resource may not be a human as per below. Could be a machine/server. It's not what they are that makes them a resource owner, its the power to *gran access* that makes them an owner. A resource owner could have also been called a *resource granter*, or even a *guardian*.

> An entity capable of granting access to a protected resource.
When the resource owner is a person, it is referred to as an
end-user.

Def. client. If an owner over a resource is a server, it could be granting clients access to its protected resources on its behalf.

> An application making protected resource requests on behalf of the
resource owner and with its authorization.

Out of scope.

> The interaction between the authorization server and resource server
is beyond the scope of this specification.

A client could, with a single request, ask for access to multiple protected resources hosted on multiple resource servers. The response could be a token accepted by them all.

> A single authorization server may issue access tokens accepted by
multiple resource servers.

A grant is represented by a code. Being in possession of a grant code means the code holder was granted access.

> An authorization grant is a credential representing the resource
owner’s authorization (to access its protected resources) used by the
client to obtain an access token.

Grant types == ways to obtain a an access token

> This specification defines four
grant types -- authorization code, implicit, resource owner password
credentials, and client credentials

Out of scope. If the token is not of bearer type for example.

> Additional authentication credentials, which are beyond
the scope of this specification, may be required in order for the
client to use a token.

Out of scope. Implementations may vary depending on type of token used. Desirable token types depend on context.

> Access token attributes and the
methods used to access protected resources are beyond the scope of
this specification and are defined by companion specifications such
as [RFC6750].

Interoperability. Out of scope. Undefined

> OAuth 2.0 provides a rich authorization framework with well-defined
security properties. However, as a rich and highly extensible
framework with many optional components, on its own, this
specification is likely to produce a wide range of non-interoperable
implementations.
>
In addition, this specification leaves a few required components
partially or fully undefined (e.g., client registration,
authorization server capabilities, endpoint discovery). Without
these components, clients must be manually and specifically
configured against a specific authorization server and resource
server in order to interoperate.
>
This framework was designed with the clear expectation that future
work will define prescriptive profiles and

Out of scope. Undefined.

> The client identifier string size is left undefined by this
specification. The client should avoid making assumptions about the
identifier size. The authorization server SHOULD document the size
of any identifier it issues.

Partially defined for confidential clients.

> The authorization
server MAY accept any form of client authentication meeting its
security requirements.

Beyond scope. Not very interesting.

> This specification does not exclude the use of unregistered clients.
However, the use of such clients is beyond the scope of this
specification and requires additional security analysis and review of
its interoperability impact.

Beyond scope: how user authenticated

> The way in
which the authorization server authenticates the resource owner
(e.g., username and password login, session cookies) is beyond the
scope of this specification.

Beyond scope: obtaining endpoint location

> The means through which the client obtains the location of the
authorization endpoint are beyond the scope of this specification,
but the location is typically provided in the service documentation.

Beyond scope. token endpoint location

> The means through which the client obtains the location of the token
endpoint are beyond the scope of this specification, but the location
is typically provided in the service documentation.

Length of state string unspecified, out of scope.

> The
authorization code string size is left undefined by this
specification.

Acces token size out of scope.

> The access
token string size is left undefined by this specification.

Token validation by resource server out of scope.

> The methods used by the resource
server to validate the access token (as well as any error responses)
are beyond the scope of this specification but generally involve an
interaction or coordination between the resource server and the
authorization server.

Error responses when accessing resource servers not defined

> If a resource access request fails, the resource server SHOULD inform
the client of the error. While the specifics of such error responses
are beyond the scope of this specification, this document establishes
a common registry in Section 11.4 for error values to be shared among
OAuth token authentication schemes.

Out of scope: who was token issued to?

> This specification does not provide any methods for the resource
server to ensure that an access token presented to it by a given
client was issued to that client by the authorization server.
