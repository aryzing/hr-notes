import Cookies from "js-cookie";
import qs from 'query-string';
// import identityServiceUrlGenerator

const depositsOrigin = `${}://${}:${}`
const zopaDepositsOpZopaSessionState = Cookies.get('zopa-deposits-OP-zopa-session-state')

const queryString = qs.parse(window.location.href.split['?'][1])

// if there's an error, notify parent to log out
if (queryString.error) {
  console.log('Received error from Authorization Server: ', queryString.error)
  window.parent.postMessage(btoa(JSON.stringify({
    type: 'ERROR',
  })), depositsOrigin);
}

// try to extract tokens from url
let payload = {}
if (queryString.id_token) {
  Cookies.set('zopa-deposits-id-token', queryString.id_token);
  payload = { ...payload, idToken: queryString.id_token }
}
if (queryString.access_token) {
  Cookies.set('zopa-deposits-access-token', queryString.access_token);
  payload = { ...payload, accessToken: queryString.access_token };
}
if (queryString.id_token || queryString.access_token) {
  window.parent.postMessage(btoa(JSON.stringify({
    type: 'SUCCESS',
    payload,
  })), depositsOrigin);
}

// try to extract session state from url
let sessionState
if (queryString.session_state) {
  sessionState = queryString.session_state;
  Cookies.set('zopa-deposits-OP-zopa-session-state', sessionState)
} else if (Cookies.get('zopa-deposits-OP-zopa-session-state')) {
  sessionState = Cookies.get('zopa-deposits-OP-zopa-session-state')
} else {
  sessionState = 'dont_have_it_yet';
}

const sendPostMessageToOPIframe = () => {
  const opIframeWindow = window.parent.document.getElementById("op-zopa-iframe").contentWindow;
  opIframeWindow.postmessage(`${process.env.CLIENT_ID} ${sessionState}`, process.env.IDENTITY_SERVICE_ORIGIN);
}

const handlePostMessage = (event) => {
  // TODO: check that origin is IS/OP

  if (event.data === 'changed') {
    // redirect to OP
    const state = {
      // attempt: 1,
      session: Cookies.get('zopa-deposits-session'),
    }
    const stateBase64UrlEncoded = btoa(JSON.stringify(state));

    // TODO: use identityServiceUrlGenerator here
    const query = qs.stringify({
      prompt: 'none',
      state: stateBase64UrlEncoded,
      redirect_uri: depositsRpIframe,
      id_token_hint: Cookies.get('zopa-deposits-id-token'),
    });

    window.location.replace(`${process.env.IDENTITY_SERVER}?${query}`)

  } else if (event.data === 'error') {
    console.warn('Received postMessage error from OP iframe.');
  } else if (event.data === 'unchanged') {
    return;
  } else {
    console.warn('Received unknown postMessage status from OP iframe: ', event.data)
  }
}

window.addEventListener('message', handlePostMessage, false)

setInterval(sendPostMessageToOPIframe, 3 * 1000)
