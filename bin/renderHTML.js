

export default function renderHTML(html, initialState) {
    return `
          <!DOCTYPE html>
          <html>
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Isomorphic Redux Demo</title>
              <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,300,500,700,900' rel='stylesheet' type='text/css'>
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
              <link rel="stylesheet" href="//cdn.materialdesignicons.com/1.2.65/css/materialdesignicons.min.css">
              <link rel="stylesheet" href="styles.css">
          </head>
          <body>
          <div id="root">${html}</div>
            <script type="application/javascript">
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
            </script>
            <script src="https://storage.googleapis.com/code.getmdl.io/1.0.6/material.min.js"></script>
            <script type="application/javascript" src="/client.js" async defer></script>
          </body>
          </html>
      `;
};
